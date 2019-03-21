module Transforms exposing (Scale, Transform, Translate, calcTransform, scaleAttr, transformGroup, translateAttr)

import Ranges exposing (Size, XY, XYRanges)
import Svg exposing (Attribute, Svg, g)
import Svg.Attributes exposing (class, transform)
import Tuples exposing (joinWithComma)


type alias Scale =
    ( Float, Float )


type alias Translate =
    ( Float, Float )


type alias Transform =
    { scale : Scale
    , translate : Translate
    }


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


scaleAttr : Transform -> Attribute msg
scaleAttr { scale } =
    scale
        |> joinWithComma
        |> (\v -> "scale(" ++ v ++ ")")
        |> transform


translateAttr : Transform -> Attribute msg
translateAttr { translate } =
    translate
        |> joinWithComma
        |> (\v -> "translate(" ++ v ++ ")")
        |> transform


transformGroup : Transform -> Svg msg -> Svg msg
transformGroup transform_ svg_ =
    svg_
        |> scaleGroup transform_
        |> translateGroup transform_


translateGroup : Transform -> Svg msg -> Svg msg
translateGroup transform_ svg_ =
    g
        [ translateAttr transform_
        , class "transition"
        ]
        [ svg_ ]


scaleGroup : Transform -> Svg msg -> Svg msg
scaleGroup transform_ svg_ =
    g
        [ scaleAttr transform_
        , class "transition"
        ]
        [ svg_ ]
