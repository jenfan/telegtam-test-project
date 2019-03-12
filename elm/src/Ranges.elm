module Ranges exposing (Range, Size, XYRanges, init, width)


type alias Range =
    ( Float, Float )


type alias Size =
    ( Float, Float )


type alias XYRanges =
    ( Range, Range )


init : Maybe Float -> Maybe Float -> Maybe Float -> Maybe Float -> Maybe XYRanges
init maybeMinX maybeMaxX maybeMinY maybeMaxY =
    case maybeMinX of
        Just minX ->
            case maybeMaxX of
                Just maxX ->
                    case maybeMinY of
                        Just minY ->
                            case maybeMaxY of
                                Just maxY ->
                                    Just ( ( minX, maxX ), ( minY, maxY ) )

                                Nothing ->
                                    Nothing

                        Nothing ->
                            Nothing

                Nothing ->
                    Nothing

        Nothing ->
            Nothing


width : Range -> Float
width ( a, b ) =
    b - a
