module Grids exposing (Grid, Msg, init, update, view, viewLineButton)

import Html exposing (Html, button, div)
import Html.Events exposing (onClick)
import Lines exposing (Line)
import Ranges exposing (Range, Size, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Transforms exposing (Transform)


type alias Grid =
    { size : Size
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
    , rowsNum = 6
    , xyRanges = xyRanges
    , transform = Transforms.calcTransform size xyRanges
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

                xyRanges =
                    Lines.valuesRange <| List.filter .active lines
            in
            { grid
                | lines = lines
                , xyRanges = xyRanges
                , transform = Transforms.calcTransform grid.size xyRanges
            }


view : Grid -> Html Msg
view grid =
    --case grid.xyRanges of
    --Just xyRanges ->
    svg
        [ heightAttr grid.size
        , widthAttr grid.size
        , viewBox "0 0 100 100"

        --, viewBox <| Transforms.viewbox grid.xyRanges grid.size
        ]
        [ drawAxes grid.size
        , drawLines grid.lines grid.transform grid.size
        ]



--Nothing ->
--    svg [] []


viewLineButton : Line -> Html Msg
viewLineButton line =
    button [ onClick (ToggleLine line.id) ] [ text <| Lines.title line ]


drawLines : List Line -> Transform -> Size -> Svg Msg
drawLines lines transform_ size =
    lines
        |> List.map (Lines.draw transform_ size)
        |> g []


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


widthAttr : Size -> Attribute msg
widthAttr ( w, _ ) =
    Svg.Attributes.width <| String.fromFloat w


heightAttr : Size -> Attribute msg
heightAttr ( _, h ) =
    Svg.Attributes.height <| String.fromFloat h
