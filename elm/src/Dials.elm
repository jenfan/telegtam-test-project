module Dials exposing (Dial, init, update, viewX, viewY)

import Points exposing (Point)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Transforms exposing (Scale, Transform)


type alias Dial =
    { xNotchCount : Int
    , yNotchCount : Int
    , scaledFrameWidth : Int
    }


init : Size -> Range -> Dial
init ( width, height ) ( x1, x2 ) =
    let
        scaledFrameWidth =
            toFloat width / (x2 - x1) |> round

        xNotchCount =
            round (1 / (x2 - x1))
                * 5
    in
    Dial xNotchCount 6 scaledFrameWidth


update : Size -> Range -> Dial -> Dial
update ( width, _ ) ( x1, x2 ) dial =
    if abs (toFloat width / (x2 - x1) - toFloat dial.scaledFrameWidth) < 0.001 then
        dial

    else
        recalc width ( x1, x2 ) dial


recalc : Int -> Range -> Dial -> Dial
recalc width ( x1, x2 ) dial =
    let
        scaledFrameWidth =
            toFloat width / (x2 - x1) |> round

        xNotchCount =
            round (1 / (x2 - x1))
                * 5
    in
    { dial | xNotchCount = xNotchCount, scaledFrameWidth = scaledFrameWidth }


viewX : Size -> Range -> Transform -> Scale -> Dial -> Svg msg
viewX ( width, height ) ( x1, x2 ) transform prescale dial =
    let
        hDivs =
            Ranges.initListFloats dial.xNotchCount dial.scaledFrameWidth
                |> List.map Points.initWithY0
                |> List.map (h (Points.actualRoundX prescale transform))
    in
    g [ class "dial" ]
        [ g [ class "x" ] hDivs
        ]


viewY : Size -> Transform -> Scale -> Dial -> Svg msg
viewY ( width, height ) transform prescale dial =
    let
        vDivs =
            Ranges.initListFloats dial.yNotchCount height
                |> List.map Points.initWithX0
                |> List.map (v width (Points.actualRoundY prescale transform))
                |> List.concat
    in
    g [ class "dial" ]
        [ g [ class "v" ] vDivs
        ]


v : Int -> (Point -> String) -> Point -> List (Svg msg)
v width actualY point =
    let
        title =
            actualY point
    in
    [ hLine width point
    , textY title point
    ]


h : (Point -> String) -> Point -> Svg msg
h actualX point =
    let
        title =
            actualX point
    in
    textX title point


hLine : Int -> Point -> Svg msg
hLine w point =
    Svg.line
        [ x1 "0"
        , y1 <| Points.renderY point
        , x2 <| String.fromInt w
        , y2 <| Points.renderY point
        , stroke "black"
        , strokeWidth "0.1"
        , transform <| "scale(1.5,1) translate(-10,0)"
        ]
        []


textY : String -> Point -> Svg msg
textY title point =
    text_
        [ x <| Points.renderX point
        , y <| Points.renderY point
        , alignmentBaseline "text-after-edge"
        , transform <| "translate(0,-20)"
        ]
        [ text title ]


textX : String -> Point -> Svg msg
textX title point =
    text_
        [ x <| Points.renderX point
        , y <| Points.renderY point
        , transform <| "translate(0,70)"
        ]
        [ text title ]



--viewHorizontal : Size -> Size -> Dial
--viewHorizontal (w,_) (wBox, _) { xNotchCount }
--    let
--        numOfSteps = w / wBox / xNotchCount
--    in
--
