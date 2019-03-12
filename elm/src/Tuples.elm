module Tuples exposing (joinWithComma, joinWithSpace)


joinWithSpace : ( Float, Float ) -> String
joinWithSpace ( x, y ) =
    [ x, y ]
        |> List.map String.fromFloat
        |> String.join " "


joinWithComma : ( Float, Float ) -> String
joinWithComma ( x, y ) =
    [ x, y ]
        |> List.map String.fromFloat
        |> String.join ","
