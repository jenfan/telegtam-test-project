module Points exposing (Point, actualRoundX, actualRoundY, init, initWithX0, initWithY0, initXY, range, render, renderX, renderY, transform)

import Ranges exposing (Size, XY, XYRanges)
import Transforms exposing (Scale, Transform, Translate)


type Point
    = Point ( Float, Float )


init : Float -> Float -> Point
init x y =
    Point ( x, y )


initXY : XY -> Point
initXY ( x, y ) =
    init x y


initWithX0 : Float -> Point
initWithX0 y =
    init 0 y


initWithY0 : Float -> Point
initWithY0 x =
    init x 0


transform : Transform -> Point -> Point
transform transform_ point =
    point
        |> scale transform_.scale
        |> translate transform_.translate


actualRoundX : Transform -> Point -> String
actualRoundX transform_ point =
    actual transform_ point
        |> renderRoundX


actualRoundY : Transform -> Point -> String
actualRoundY transform_ point =
    actual transform_ point
        |> renderRoundY


actual : Transform -> Point -> Point
actual transform_ point =
    point
        |> untranslate transform_.translate
        |> unscale transform_.scale


scale : Scale -> Point -> Point
scale ( scaleX, scaleY ) (Point ( x, y )) =
    Point ( scaleX * x, scaleY * y )


translate : Translate -> Point -> Point
translate ( trX, trY ) (Point ( x, y )) =
    Point ( x + trX, y + trY )


unscale : Scale -> Point -> Point
unscale ( scaleX, scaleY ) (Point ( x, y )) =
    Point ( x / scaleX, y / scaleY )


untranslate : Translate -> Point -> Point
untranslate ( trX, trY ) (Point ( x, y )) =
    Point ( x - trX, 0 - y - trY )


render : Point -> String
render point =
    renderX point ++ "," ++ renderY point


renderX : Point -> String
renderX (Point ( x, _ )) =
    String.fromFloat x


renderY : Point -> String
renderY (Point ( _, y )) =
    String.fromFloat -y


renderRoundX : Point -> String
renderRoundX (Point ( x, _ )) =
    String.fromInt <| round x


renderRoundY : Point -> String
renderRoundY (Point ( _, y )) =
    String.fromInt <| round -y


range : List Point -> Maybe XYRanges
range points =
    let
        ( xList, yList ) =
            points
                |> List.map unzip
                |> List.unzip

        xRange =
            Ranges.init xList

        yRange =
            Ranges.init yList
    in
    Ranges.initXYRanges xRange yRange


unzip : Point -> XY
unzip (Point ( x, y )) =
    ( x, y )
