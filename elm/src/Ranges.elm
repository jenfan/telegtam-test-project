module Ranges exposing (Range, Size, XY, XYRanges, init, initListFloats, initWithMaybe, initXYRanges, width)


type alias Range =
    ( Float, Float )


type alias Size =
    ( Int, Int )


type alias XY =
    ( Float, Float )


type alias XYRanges =
    ( Range, Range )


init : List Float -> Maybe Range
init floats =
    let
        min =
            List.minimum floats

        max =
            List.maximum floats
    in
    initWithMaybe min max


initListFloats : Int -> Int -> List Float
initListFloats count width_ =
    let
        step =
            toFloat width_ / toFloat count
    in
    List.range 0 count
        |> List.map toFloat
        |> List.map (\a -> a * step)


initWithMaybe : Maybe Float -> Maybe Float -> Maybe Range
initWithMaybe mbX mbY =
    case mbX of
        Just x ->
            case mbY of
                Just y ->
                    Just ( x, y )

                Nothing ->
                    Nothing

        Nothing ->
            Nothing


initXYRanges : Maybe Range -> Maybe Range -> Maybe XYRanges
initXYRanges maybeXRange maybeYRange =
    case maybeXRange of
        Just xRange ->
            case maybeYRange of
                Just yRange ->
                    Just ( xRange, yRange )

                Nothing ->
                    Nothing

        Nothing ->
            Nothing


width : Range -> Float
width ( a, b ) =
    b - a
