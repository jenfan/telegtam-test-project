module Lines exposing (Line, draw, init, title, toString, transform, valuesRange)

import Points exposing (Point)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Transforms exposing (Transform)
import Tuples


type alias Line =
    { points : List Point
    , active : Bool
    , id : Int
    , color : String
    }


init :
    { id : Int
    , color : String
    , points : List XY
    }
    -> Line
init { points, id, color } =
    Line (List.map Points.initXY points) True id color


toString : Line -> String
toString { points } =
    points
        |> List.map Points.render
        |> String.join " "


title : Line -> String
title line =
    "Toggle " ++ String.fromInt line.id


draw : Transform -> Size -> Line -> Svg msg
draw transform_ size line =
    Svg.polyline
        [ pointsAttr line
        , fill "none"
        , stroke line.color
        , strokeWidth "2"
        , classList [ ( "hidden", not line.active ), ( "line", True ) ]
        , id <| String.fromInt line.id
        ]
        []


transform : Transform -> Line -> Line
transform transform_ line =
    let
        newPoints =
            line.points
                |> List.map (Points.transform transform_)
    in
    { line | points = newPoints }


classList : List ( String, Bool ) -> Attribute msg
classList list =
    list
        |> List.filter Tuple.second
        |> List.map Tuple.first
        |> String.join " "
        |> class


pointsAttr : Line -> Attribute msg
pointsAttr line =
    line.points
        |> List.map Points.render
        |> String.join " "
        |> Svg.Attributes.points


valuesRange : List Line -> Maybe XYRanges
valuesRange lines =
    lines
        |> List.map .points
        |> List.concat
        |> Points.range
