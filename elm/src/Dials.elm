module Dials exposing (Dial, init, view)

import Points exposing (Point)
import Ranges exposing (Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Transforms exposing (Transform)


type alias Dial =
    { xNotchCount : Int
    , yNotchCount : Int
    , stepX : Float
    , stepY : Float
    }


init : Size -> Dial
init ( width, height ) =
    Dial 5 6 (width / 5.0) (height / 6.0)


view : Size -> XYRanges -> Transform -> Dial -> Svg msg
view ( width, height ) ( xRange, yRange ) transform dial =
    let
        vDivs =
            Ranges.initListFloats dial.yNotchCount height
                |> List.map Points.initWithX0
                |> List.map (v width (Points.actualRoundY transform))
                |> List.concat

        hDivs =
            Ranges.initListFloats dial.xNotchCount width
                |> List.map Points.initWithY0
                |> List.map (h (Points.actualRoundX transform))
    in
    g [ class "dial" ]
        [ g [ class "v" ] vDivs
        , g [ class "h" ] hDivs
        ]


v : Float -> (Point -> String) -> Point -> List (Svg msg)
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


hLine : Float -> Point -> Svg msg
hLine w point =
    Svg.line
        [ x1 "0"
        , y1 <| Points.renderY point
        , x2 <| String.fromFloat w
        , y2 <| Points.renderY point
        , stroke "black"
        , strokeWidth "0.1"
        ]
        []


textY : String -> Point -> Svg msg
textY title point =
    text_
        [ Svg.Attributes.x <| Points.renderX point
        , Svg.Attributes.y <| Points.renderY point
        , transform <| "translate(-10,-3)"
        ]
        [ text title ]


textX : String -> Point -> Svg msg
textX title point =
    text_
        [ Svg.Attributes.x <| Points.renderX point
        , Svg.Attributes.y <| Points.renderY point
        , transform <| "translate(3,10)"
        ]
        [ text title ]
