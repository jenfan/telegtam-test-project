module Lines exposing (Line, initModel1, initModel2, to_s)

import Points exposing (Point)


type alias Line =
    List Point


initModel1 : List Point
initModel1 =
    [ ( 0, 100 )
    , ( 50, 25 )
    , ( 50, 75 )
    , ( 100, 0 )
    , ( 100, 111110 )
    ]


initModel2 : List Point
initModel2 =
    [ ( 20, 34 )
    , ( 30, 45 )
    , ( 20, 21 )
    , ( 10, 23 )
    , ( 10, 23 )
    ]


to_s : Line -> String
to_s line =
    List.map Points.to_s line
        |> String.join ","



--viewLine : Line -> Svg msg
--viewLine line =
--    Svg.polyline
--        [ Svg.Attributes.points <| Lines.to_s line
--        , fill "none"
--        , stroke "black"
--        , strokeWidth "3"
--        ]
--        []
