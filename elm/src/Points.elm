module Points exposing (Point, new, to_s, transform)

import Ranges exposing (Size, XYRanges)


type alias Point =
    ( Float, Float )


type alias RangePosition =
    ( Float, Float )


new : ( Float, Float ) -> Point
new ( x, y ) =
    ( x, y )


to_s : Point -> String
to_s ( x, y ) =
    String.fromFloat x ++ "," ++ String.fromFloat y ++ " "


transform : Size -> XYRanges -> Point -> Point
transform size xyRanges point =
    point
        |> rangePosition xyRanges
        |> scale size


rangePosition : XYRanges -> Point -> RangePosition
rangePosition ( ( minX, maxX ), ( minY, maxY ) ) ( x, y ) =
    ( (x - minX) / (maxX - minX)
    , (y - minY) / (maxY - minY)
    )


scale : Size -> RangePosition -> Point
scale ( w, h ) ( xPos, yPos ) =
    ( w * xPos, h * yPos )
