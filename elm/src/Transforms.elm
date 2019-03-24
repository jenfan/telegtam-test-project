module Transforms exposing (Scale, Transform, Transition(..), Translate, calcTransform, scaleAttr, transformGroup, transformToPositionGroup, translateAttr)

import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (Attribute, Svg, g)
import Svg.Attributes exposing (class, transform)
import Utils exposing (joinWithComma)


type alias Scale =
    ( Float, Float )


type alias Translate =
    ( Float, Float )


type alias Transform =
    { scale : Scale
    , translate : Translate
    }


type Transition
    = Slow
    | Fast


transitionToStr : Transition -> String
transitionToStr transition =
    case transition of
        Fast ->
            "transition-fast"

        Slow ->
            "transition-slow"


calcTransform : Size -> Maybe XYRanges -> Transform
calcTransform size maybeXYRange =
    case maybeXYRange of
        Just xyRanges ->
            let
                scale =
                    calcScale size xyRanges

                translate =
                    calcTranslate size scale xyRanges
            in
            { scale = scale
            , translate = translate
            }

        Nothing ->
            { scale = ( 1, 1 ), translate = ( 0, 0 ) }


calcScale : Size -> XYRanges -> Scale
calcScale ( w, h ) ( xRange, yRange ) =
    let
        xRangeWidth =
            Ranges.width xRange

        yRangeWidth =
            Ranges.width yRange

        scaleX =
            case xRangeWidth == 0 of
                True ->
                    1

                False ->
                    toFloat w / xRangeWidth

        scaleY =
            case yRangeWidth == 0 of
                True ->
                    1

                False ->
                    toFloat h / yRangeWidth
    in
    ( scaleX, scaleY )


calcTranslate : Size -> Scale -> XYRanges -> Translate
calcTranslate ( w, h ) ( xScale, yScale ) ( ( minX, maxX ), ( minY, maxY ) ) =
    ( (toFloat w - (minX + maxX) * xScale) / 2
    , (toFloat h - minY * yScale - maxY * yScale) / 2 * -1
    )


transformToPositionGroup : Range -> Size -> Svg msg -> Svg msg
transformToPositionGroup ( x1, x2 ) ( w, _ ) svg_ =
    let
        scaleX =
            1 / (x2 - x1)

        translateX =
            toFloat w * scaleX * x1 * -1

        transform =
            Transform ( scaleX, 1.0 ) ( translateX, 0.0 )
    in
    transformGroup transform Fast svg_


scaleAttr : Transform -> Attribute msg
scaleAttr { scale } =
    scale
        |> joinWithComma
        |> (\v -> "scale(" ++ v ++ ")")
        |> transform


translateAttr : Translate -> Attribute msg
translateAttr translate =
    translate
        |> joinWithComma
        |> (\v -> "translate(" ++ v ++ ")")
        |> transform


transformGroup : Transform -> Transition -> Svg msg -> Svg msg
transformGroup transform_ transition svg_ =
    svg_
        |> scaleGroup transform_ transition
        |> translateGroup transform_ transition


translateGroup : Transform -> Transition -> Svg msg -> Svg msg
translateGroup transform_ transition svg_ =
    g
        [ translateAttr transform_.translate
        , class <| transitionToStr transition
        ]
        [ svg_ ]


scaleGroup : Transform -> Transition -> Svg msg -> Svg msg
scaleGroup transform_ transition svg_ =
    g
        [ scaleAttr transform_
        , class <| transitionToStr transition
        ]
        [ svg_ ]
