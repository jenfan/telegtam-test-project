module Grids.Frame exposing (Frame, init, updatePosition, view)

import Dials exposing (Dial)
import Grids exposing (Grid)
import Html exposing (Html, div)
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Transform, Transition(..), Translate)


type alias Frame =
    Grid { position : Range, dial : Dial }


init :
    { size : Size
    , lines : List Line
    , margins : Int
    , position : Range
    , id : String
    }
    -> Frame
init { size, position, lines, margins, id } =
    let
        ( scaledLines, pretransformScale ) =
            Grids.pretransformLines lines

        valuesRange =
            Lines.valuesRange scaledLines
    in
    { size = size
    , margins = margins
    , valuesRange = valuesRange
    , transform = Transforms.calcTransform size valuesRange
    , pretransformScale = pretransformScale
    , lines = scaledLines
    , position = position
    , dial = Dials.init size position
    }


updatePosition : Range -> Frame -> Frame
updatePosition position ({ size } as frame) =
    { frame
        | position = position
        , dial = Dials.update frame.size frame.position frame.dial
    }


view : Frame -> Html msg
view ({ size } as frame) =
    let
        w =
            Tuple.first size - frame.margins

        h =
            Tuple.second size
    in
    case frame.valuesRange of
        Just range ->
            svg
                [ width <| String.fromInt w
                , height <| String.fromInt h
                , viewBoxAttr frame.size frame.margins
                , preserveAspectRatio "none"
                , class "frame"
                ]
                [ viewDial frame
                , viewLines frame
                ]

        Nothing ->
            svg
                [ width <| String.fromInt w
                , height <| String.fromInt h
                ]
                [ text_
                    [ x <| String.fromInt (w // 2)
                    , y <| String.fromInt (h // 2)
                    , Attr.style "font-size: 40pt"
                    , textAnchor "middle"
                    ]
                    [ text "NO DATA" ]
                ]


viewLines : Frame -> Svg msg
viewLines frame =
    let
        transform =
            Transforms.transformToPositionGroup frame.position frame.size

        transformedLines =
            Transforms.transformGroup transform Fast (Grids.viewLines frame)

        translatedDial =
            Dials.viewX frame.size frame.position frame.transform frame.pretransformScale frame.dial
                |> Transforms.translateGroup transform Fast
    in
    g []
        [ transformedLines
        , translatedDial
        ]


calcBoxPosTranslate : Range -> Size -> Translate
calcBoxPosTranslate ( x1, x2 ) ( width, _ ) =
    ( toFloat width * x1 / (x1 - x2), 0 )


viewDial : Frame -> Svg msg
viewDial frame =
    Dials.viewY frame.size frame.transform frame.pretransformScale frame.dial


viewBoxAttr : Size -> Int -> Attribute msg
viewBoxAttr ( w, h ) margin =
    [ 0 - margin
    , (h + margin) * -1
    , w + margin
    , h + margin * 7
    ]
        |> List.map String.fromInt
        |> String.join " "
        |> viewBox
