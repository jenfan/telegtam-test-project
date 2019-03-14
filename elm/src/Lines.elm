module Lines exposing (Line, draw, init, title, toString, valuesRange)

import Points exposing (Point)
import Ranges exposing (Range, Size, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Transforms exposing (Transform)
import Tuples


type alias Line =
    { points : List Point
    , nextPoints : List Point
    , active : Bool
    , id : Int
    , color : String
    }


init :
    { points : List Point
    , id : Int
    , color : String
    }
    -> Line
init { points, id, color } =
    Line points [] True id color


toString : Line -> String
toString { points } =
    points
        |> List.map Points.toString
        |> String.join " "


title : Line -> String
title line =
    "Toggle " ++ String.fromInt line.id


draw : Transform -> Size -> Line -> Svg msg
draw transform_ size line =
    Svg.polyline
        [ pointsAttr transform_ size line
        , fill "none"
        , stroke line.color
        , strokeWidth "3"

        --, transform <| Transforms.translateAttr transform_
        --, transform <| Transforms.scaleAttr transform_
        --, transform <| Transforms.scaleAndTranslateAttr transform_
        , class "translate line"
        , activeClass line
        , id <| String.fromInt line.id
        ]
        []


pointsAttr : Transform -> Size -> Line -> Attribute msg
pointsAttr transform size line =
    line.points
        |> List.map (Points.render transform size)
        |> List.map Points.toString
        |> String.join " "
        |> Svg.Attributes.points


animate { scale } =
    animateTransform
        [ attributeName "transform"
        , type_ "scale"

        --, from "1 1"
        , to <| Tuples.joinWithSpace scale
        , begin "0s"
        , dur "0.85s"
        , repeatCount "1"
        ]
        []


activeClass line =
    if line.active then
        class ""

    else
        class "hidden"


valuesRange : List Line -> Maybe XYRanges
valuesRange lines =
    let
        ( xList, yList ) =
            splitToAxes lines

        xMin =
            List.minimum xList

        yMin =
            List.minimum yList

        xMax =
            List.maximum xList

        yMax =
            List.maximum yList
    in
    Ranges.init xMin xMax yMin yMax


splitToAxes : List Line -> ( List Float, List Float )
splitToAxes lines =
    lines
        |> List.map .points
        |> List.concat
        |> List.unzip
