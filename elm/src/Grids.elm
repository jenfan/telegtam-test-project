module Grids exposing (Grid, Msg, init, resize, subscriptions, toggleLine, update, view)

import Dials
import Html exposing (Html, div)
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Transform)
import Tuples


type alias Grid =
    { size : Size
    , margins : Int
    , xyRanges : Maybe XYRanges
    , transform : Transform
    , lines : List Line
    , mainFrame : Bool
    , mapBox : Maybe MapBox
    }


type Msg
    = MapBoxMsg MapBoxes.Msg


init : { size : Size, lines : List Line, mainFrame : Bool, margins : Int, id : String } -> ( Grid, Cmd Msg )
init { size, lines, mainFrame, margins, id } =
    let
        xyRanges =
            Lines.valuesRange lines

        ( mapBox, cmd ) =
            case mainFrame of
                False ->
                    MapBoxes.init size id

                True ->
                    ( Nothing, Cmd.none )
    in
    ( { size = size
      , margins = margins
      , xyRanges = xyRanges
      , transform = Transforms.calcTransform size xyRanges
      , lines = lines
      , mainFrame = mainFrame
      , mapBox = mapBox
      }
    , Cmd.map MapBoxMsg cmd
    )



-- UPDATE


update : Msg -> Grid -> Grid
update msg grid =
    case msg of
        MapBoxMsg subMsg ->
            case grid.mapBox of
                Just mapBox ->
                    { grid
                        | mapBox =
                            Just (MapBoxes.update subMsg mapBox)
                    }

                Nothing ->
                    grid


toggleLine : Grid -> Int -> Grid
toggleLine grid lineId =
    let
        updateLine line =
            case line.id == lineId of
                True ->
                    { line | active = not line.active }

                False ->
                    line

        lines =
            List.map updateLine grid.lines

        xyRanges =
            Lines.valuesRange <| List.filter .active lines
    in
    { grid
        | lines = lines
        , xyRanges = xyRanges
        , transform = Transforms.calcTransform grid.size xyRanges
    }


resize : Grid -> Size -> Grid
resize grid size =
    { grid
        | transform = Transforms.calcTransform size grid.xyRanges
        , size = size
    }


subscriptions : Sub Msg
subscriptions =
    Sub.map MapBoxMsg MapBoxes.subscriptions



-- VIEW


view : Grid -> Html Msg
view grid =
    svg
        [ width <| String.fromInt <| Tuple.first grid.size
        , height <| String.fromInt <| Tuple.second grid.size
        , viewBoxAttr grid.size grid.margins

        --, viewBox <| Transforms.viewbox grid.xyRanges grid.size
        ]
        [ viewDialOrMaxBox grid
        , viewLines grid
        ]


viewLines : Grid -> Svg msg
viewLines grid =
    grid.lines
        |> List.map (Lines.draw grid.transform grid.size)
        |> g []
        |> Transforms.transformGroup grid.transform


viewDialOrMaxBox : Grid -> Svg Msg
viewDialOrMaxBox grid =
    if grid.mainFrame then
        case grid.xyRanges of
            Just range ->
                let
                    dial =
                        Dials.init grid.size
                in
                Dials.view grid.size range grid.transform dial

            Nothing ->
                g [] []

    else
        viewMapBox grid


viewMapBox : Grid -> Svg Msg
viewMapBox grid =
    case grid.mapBox of
        Just mapBox ->
            Svg.map MapBoxMsg (MapBoxes.view mapBox)

        Nothing ->
            g [] []


viewBoxAttr : Size -> Int -> Attribute msg
viewBoxAttr ( w, h ) margin =
    [ 0 - margin * 5
    , (h + margin) * -1
    , w + margin * 10
    , h + margin * 10
    ]
        |> List.map String.fromInt
        |> String.join " "
        |> viewBox
