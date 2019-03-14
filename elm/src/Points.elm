module Points exposing (Point, normalCordinates, render, toString)

import Ranges exposing (Size, XYRanges)
import Transforms exposing (Scale, Transform, Translate)


type alias Point =
    ( Float, Float )


type alias RangePosition =
    ( Float, Float )


render : Transform -> Size -> Point -> Point
render transform ( _, height ) point =
    point
        |> scale transform.scale
        |> translate transform.translate
        |> normalCordinates height


scale : Scale -> Point -> Point
scale ( scaleX, scaleY ) ( x, y ) =
    ( scaleX * x, scaleY * y )


translate : Translate -> Point -> Point
translate ( trX, trY ) ( x, y ) =
    ( x + trX, y + trY )


normalCordinates : Float -> Point -> Point
normalCordinates height ( x, y ) =
    ( x, height - y )


toString : Point -> String
toString ( x, y ) =
    String.fromFloat x ++ "," ++ String.fromFloat y
