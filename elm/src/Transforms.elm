module Transforms exposing (Scale, Transform, Translate, calcTransform, scaleAndTranslateAttr, scaleAttr, translateAttr, viewbox)

import Ranges exposing (Size, XYRanges)
import Svg.Attributes
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
                    Debug.log "scale" <| calcScale size xyRanges

                translate =
                    calcTranslate size scale <| Debug.log "xyRange:" xyRanges
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
                -- 1 Coordinate
                True ->
                    1

                False ->
                    w / xRangeWidth

        scaleY =
            case yRangeWidth == 0 of
                True ->
                    --h / minY
                    1

                False ->
                    --h / yRangeWidth
                    1
    in
    ( scaleX, scaleY )


calcTranslate : Size -> Scale -> XYRanges -> Translate
calcTranslate ( w, h ) ( xScale, yScale ) ( ( minX, maxX ), ( minY, maxY ) ) =
    ( (w - maxX * xScale - minX * xScale) / 2
    , (h - maxY * yScale - minY * yScale) / 2
    )



--( minX, minY )


scaleAttr { scale } =
    scale
        |> joinWithComma
        |> (\v -> "scale(" ++ v ++ ")")


translateAttr { translate } =
    translate
        |> joinWithComma
        |> (\v -> "translate(" ++ v ++ ")")


scaleAndTranslateAttr : Transform -> String
scaleAndTranslateAttr transform =
    scaleAttr transform ++ " " ++ translateAttr transform


viewbox : Maybe XYRanges -> Size -> String
viewbox maybeXYRange ( w, h ) =
    let
        coordinates =
            case maybeXYRange of
                Just ( ( minX, maxX ), ( minY, maxY ) ) ->
                    [ minX, minY, maxX - minX, maxY - minY ]

                --[ minX, minY, w, h ]
                Nothing ->
                    [ 0, 0, w, h ]
    in
    coordinates
        |> List.map String.fromFloat
        |> String.join " "


to_s : ( Float, Float ) -> String
to_s ( x, y ) =
    [ x, y ]
        |> List.map String.fromFloat
        |> String.join ","
