module Grids.Map exposing (Msg, init, resize, subscriptions, update, view)

import Grids exposing (Grid)
import Html exposing (Html)
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Size)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Transform)


init : { size : Size, lines : List Line, margins : Int, id : String } -> ( Grid, Cmd Msg )
init { size, lines, margins, id } =
    let
        valuesRange =
            Lines.valuesRange lines

        ( mapBox, cmd ) =
            MapBoxes.init size id
    in
    ( { size = size
      , margins = margins
      , valuesRange = valuesRange
      , transform = Transforms.calcTransform size valuesRange
      , lines = lines
      , mapBox = mapBox
      }
    , Cmd.map MapBoxMsg cmd
    )


type Msg
    = MapBoxMsg MapBoxes.Msg



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


resize : Size -> Grid -> Grid
resize size map =
    case map.mapBox of
        Just mapBox ->
            map
                |> Grids.resize size
                |> (\m -> { m | mapBox = Just (MapBoxes.resize size mapBox) })

        Nothing ->
            map



-- SUBSCRIPTIONS


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

        --, viewBox <| Transforms.viewbox grid.valuesRange grid.size
        ]
        [ viewMapBox grid
        , Grids.viewLines grid
        ]


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
