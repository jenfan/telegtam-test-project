port module Grids exposing (Grid, Msg, init, subscriptions, update, view, viewLineBtn)

import Dials
import Html exposing (Html, button, div)
import Html.Events exposing (onClick)
import Lines exposing (Line)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Transforms exposing (Transform)
import Tuples


type alias Grid =
    { size : Size
    , margins : Int
    , rowsNum : Int
    , xyRanges : Maybe XYRanges
    , transform : Transform
    , lines : List Line
    }


init : Size -> List Line -> Grid
init size lines =
    let
        xyRanges =
            Lines.valuesRange lines
    in
    { size = size
    , margins = 10
    , rowsNum = 6
    , xyRanges = xyRanges
    , transform = Transforms.calcTransform size xyRanges
    , lines = lines
    }


type Msg
    = ToggleLine Int
    | WindowResized Size


port windResized : (Size -> msg) -> Sub msg


update : Msg -> Grid -> Grid
update msg grid =
    case msg of
        ToggleLine id ->
            let
                updateLine line =
                    case line.id == id of
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

        WindowResized size ->
            { grid
                | transform = Transforms.calcTransform size grid.xyRanges
                , size = size
            }


subscriptions : Sub Msg
subscriptions =
    windResized WindowResized


view : Grid -> Html Msg
view grid =
    svg
        [ width <| String.fromInt <| Tuple.first grid.size
        , height <| String.fromInt <| Tuple.second grid.size
        , viewBoxAttr grid.size grid.margins

        --, viewBox <| Transforms.viewbox grid.xyRanges grid.size
        ]
        [ drawAxes grid.size grid.xyRanges grid.transform
        , drawLines grid.lines grid.transform grid.size
        ]


viewLineBtn : Line -> Html Msg
viewLineBtn line =
    button
        [ onClick (ToggleLine line.id)
        , class line.color
        ]
        [ text <| Lines.title line ]


drawLines : List Line -> Transform -> Size -> Svg Msg
drawLines lines transform_ size =
    lines
        |> List.map (Lines.draw transform_ size)
        |> g []
        |> Transforms.transformGroup transform_


drawAxes : Size -> Maybe XYRanges -> Transform -> Svg msg
drawAxes size xyRanges transform_ =
    case xyRanges of
        Just range ->
            let
                dial =
                    Dials.init size
            in
            Dials.view size range transform_ dial

        Nothing ->
            svg [] []


viewBoxAttr : Size -> Int -> Attribute msg
viewBoxAttr ( w, h ) margin =
    [ 0 - margin
    , (h + margin) * -1
    , w + margin * 2
    , h + margin * 2
    ]
        |> List.map String.fromInt
        |> String.join " "
        |> viewBox
