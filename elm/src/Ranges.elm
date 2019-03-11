module Ranges exposing (Range, ScaleRatio, Size, XYRanges, init)


type alias Range =
    ( Float, Float )


type alias Size =
    ( Float, Float )


type alias ScaleRatio =
    ( Float, Float )


type alias XYRanges =
    ( Range, Range )


init : Maybe Float -> Maybe Float -> Maybe Range
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
