module Lines exposing (Line, draw, init, toString, transform, valuesRange, viewBtn)

import Html exposing (Html, button, div, span, text)
import Html.Events exposing (onClick)
import Points exposing (Point)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (Attribute, Svg, svg)
import Svg.Attributes exposing (..)
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


viewBtn : (Int -> msg) -> Line -> Html msg
viewBtn msg line =
    button
        [ onClick (msg line.id)
        , classList [ ( "active", line.active ) ]
        ]
        [ div
            [ "background-color: "
                ++ backgroundColor line
                ++ "; border: 8px solid "
                ++ line.color
                |> style
            , class "circle"
            ]
            [ galka ]
        , span [] [ Html.text line.title ]
        ]


backgroundColor : Line -> String
backgroundColor line =
    if line.active then
        line.color

    else
        "transparent"


galka =
    svg
        [ height "45"
        , width "45"
        , viewBox "0 0 159.67 125.84"
        ]
        [ Svg.path [ fill "none", stroke "none", d "M154.22,5.45h0a18.31,18.31,0,0,0-25.82,0L52.23,81.62l-20.95-21a18.32,18.32,0,0,0-25.83,0h0a18.32,18.32,0,0,0,0,25.83l33,33c.26.3.54.6.83.89h0a18.31,18.31,0,0,0,25.82,0l89.11-89.11A18.31,18.31,0,0,0,154.22,5.45Z" ] []
        ]
