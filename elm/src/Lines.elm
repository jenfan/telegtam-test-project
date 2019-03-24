module Lines exposing (Line, draw, init, toString, transform, valuesRange)

import Points exposing (Point)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (Attribute, Svg)
import Svg.Attributes exposing (class, fill, id, stroke, strokeWidth)
import Transforms exposing (Transform)
import Utils exposing (classList)


type alias Line =
    { points : List Point
    , active : Bool
    , id : Int
    , color : String
    , title : String
    }


init :
    { id : Int
    , color : String
    , points : List XY
    , title : String
    }
    -> Line
init { points, id, color, title } =
    Line (List.map Points.initXY points) True id color title


toString : Line -> String
toString { points } =
    points
        |> List.map Points.render
        |> String.join " "


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
