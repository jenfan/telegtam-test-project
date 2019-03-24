module Utils exposing (classList, joinWithComma, joinWithSpace)

import Svg exposing (Attribute)
import Svg.Attributes exposing (class)


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


classList : List ( String, Bool ) -> Attribute msg
classList list =
    list
        |> List.filter Tuple.second
        |> List.map Tuple.first
        |> String.join " "
        |> class
