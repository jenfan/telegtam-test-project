module Points exposing (Point, new, to_s)


type alias Point =
    ( Int, Int )


new : ( Int, Int ) -> Point
new ( x, y ) =
    ( x, y )


to_s : Point -> String
to_s ( x, y ) =
    String.fromInt x ++ " " ++ String.fromInt y
