module Lines exposing (Line, calcRanges, drawLine, initModel1, initModel2, title, to_s)

import Points exposing (Point)
import Ranges exposing (Range, Size, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)


type alias Line =
    { points : List Point
    , active : Bool
    , id : Int
    }


initModel1 : Line
initModel1 =
    { points =
        [ ( 0, 120 )
        , ( 20, 125 )
        , ( 10, 275 )
        , ( 200, 110 )
        , ( 420, 212 )
        ]
    , active = True
    , id = 1
    }


initModel2 : Line
initModel2 =
    { points =
        [ ( 2, 34 )
        , ( 20, 423 )
        , ( 140, 123 )
        , ( 280, 321 )
        , ( 430, 45 )
        ]
    , active = True
    , id = 2
    }


to_s : Line -> String
to_s line =
    List.map Points.to_s line.points
        |> String.join " "


title : Line -> String
title line =
    "Toggle " ++ String.fromInt line.id


drawLine : Size -> XYRanges -> Line -> Svg msg
drawLine size xyRanges line =
    line
        |> scale size xyRanges
        |> view


scale : Size -> XYRanges -> Line -> Line
scale size xyRanges line =
    let
        points =
            line.points
                |> List.map (Points.transform size xyRanges)
    in
    { line | points = points }


view : Line -> Svg msg
view line =
    Svg.polyline
        [ to_s line |> points
        , fill "none"
        , stroke "black"
        , strokeWidth "3"
        ]
        []


calcRanges : List Line -> Maybe XYRanges
calcRanges lines =
    case xRange lines of
        Just xRange_ ->
            case yRange lines of
                Just yRange_ ->
                    Just ( xRange_, yRange_ )

                _ ->
                    Nothing

        _ ->
            Nothing


xRange : List Line -> Maybe Range
xRange lines =
    let
        xList =
            lines
                |> List.map .points
                |> List.concat
                |> List.map (\( x, _ ) -> x)

        xMin =
            List.minimum xList

        xMax =
            List.maximum xList
    in
    Ranges.init xMin xMax


yRange : List Line -> Maybe Range
yRange lines =
    let
        yList =
            lines
                |> List.map .points
                |> List.concat
                |> List.map (\( _, y ) -> y)

        yMin =
            List.minimum yList

        yMax =
            List.maximum yList
    in
    Ranges.init yMin yMax
