module Grids exposing (Grid, Msg, init, update, view, viewLineButton)

import Html exposing (Html, button, div)
import Html.Events exposing (onClick)
import Lines exposing (Line)
import Ranges exposing (Range, ScaleRatio, Size, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)


type alias Grid =
    { size : Size
    , rowsNum : Int
    , xyRanges : Maybe XYRanges
    , lines : List Line
    }


init : Size -> List Line -> Grid
init size lines =
    { size = size
    , rowsNum = 6
    , xyRanges = Lines.calcRanges lines
    , lines = lines
    }


type Msg
    = ToggleLine Int


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
            in
            { grid
                | lines = lines
                , xyRanges = Lines.calcRanges <| List.filter .active lines
            }


view : Grid -> Html Msg
view grid =
    case grid.xyRanges of
        Just xyRanges ->
            svg
                [ width <| String.fromFloat <| Tuple.first <| grid.size
                , height <| String.fromFloat <| Tuple.second <| grid.size
                ]
                [ drawAxes grid.size
                , drawLines grid.lines grid.size xyRanges
                ]

        Nothing ->
            svg [] []


viewLineButton : Line -> Html Msg
viewLineButton line =
    button [ onClick (ToggleLine line.id) ] [ text <| Lines.title line ]


drawLines : List Line -> Size -> XYRanges -> Svg Msg
drawLines lines size xyRanges =
    lines
        |> List.filter .active
        |> List.map (Lines.drawLine size xyRanges)
        |> svg []


drawAxes : Size -> Svg msg
drawAxes ( width, height ) =
    svg []
        [ Svg.line
            [ x1 "0"
            , y1 "0"
            , x2 "0"
            , y2 <| String.fromFloat height
            , stroke "black"
            , strokeWidth "3"
            ]
            []
        , Svg.line
            [ x1 "0"
            , y1 <| String.fromFloat height
            , x2 <| String.fromFloat width
            , y2 <| String.fromFloat height
            , stroke "black"
            , strokeWidth "3"
            ]
            []
        ]
