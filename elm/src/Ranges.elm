module Ranges exposing (Range, XYRanges, init, xyRanges)

import Lines exposing (Line)


type alias Range =
    ( Int, Int )


type alias XYRanges =
    ( Range, Range )


init : Maybe Int -> Maybe Int -> Maybe Range
init maybeMin maybeMax =
    case maybeMin of
        Just min ->
            case maybeMax of
                Just max ->
                    Just ( min, max )

                _ ->
                    Nothing

        _ ->
            Nothing


xyRanges : List Line -> Maybe XYRanges
xyRanges lines =
    case xRange lines of
        Just xRange_ ->
            case yRange lines of
                Just yRange_ ->
                    Just ( xRange_, yRange_ )

                _ ->
                    Nothing

        _ ->
            Nothing


xRange : List Line -> Maybe Range
xRange lines =
    let
        xList =
            lines
                |> List.concat
                |> List.map (\( x, _ ) -> x)

        xMin =
            List.minimum xList

        xMax =
            List.maximum xList
    in
    init xMin xMax


yRange : List Line -> Maybe Range
yRange lines =
    let
        yList =
            lines
                |> List.concat
                |> List.map (\( _, y ) -> y)

        yMin =
            List.minimum yList

        yMax =
            List.maximum yList
    in
    init yMin yMax
