module Grids exposing (Grid, init, resize, toggleLine, view)

import Dials
import Html exposing (Html, div)
import Lines exposing (Line)
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
    , axes : Bool
    }


init : { size : Size, lines : List Line, axes : Bool, margins : Int } -> Grid
init { size, lines, axes, margins } =
    let
        xyRanges =
            Lines.valuesRange lines
    in
    { size = size
    , margins = margins
    , xyRanges = xyRanges
    , transform = Transforms.calcTransform size xyRanges
    , lines = lines
    , axes = axes
    }



-- UPDATE


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



-- VIEW


view : Grid -> Html msg
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


viewDialOrMaxBox : Grid -> Svg msg
viewDialOrMaxBox grid =
    if grid.axes then
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
        viewMapBox grid.size


viewMapBox : Size -> Svg msg
viewMapBox ( width, height ) =
    let
        boxWidth =
            toFloat width / 4 |> round

        x =
            width - boxWidth
    in
    Svg.rect
        [ Attr.width <| String.fromInt <| boxWidth
        , Attr.height <| String.fromInt height
        , Attr.x <| String.fromInt x
        , Attr.y <| String.fromInt <| -1 * height

        --, Attr.cursor cursor
        , Attr.fillOpacity "0.25"

        --, Draggable.mouseTrigger "" DragMsg
        ]
        []


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
