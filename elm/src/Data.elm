module Data exposing (initModels)

import Lines exposing (Line)


initModels : List Line
initModels =
    [ { points =
            [ ( -100, 50 )
            , ( 100, 50 )
            ]
      , id = 1
      , color = "green"
      }
    , { points =
            [ ( 100, 0 )
            , ( 1300, 0 )
            ]
      , id = 2
      , color = "red"
      }
    , { points =
            [ ( 200, 75 )
            , ( 300, 75 )
            ]
      , id = 3
      , color = "blue"
      }
    , { points =
            [ ( 200, 0 )
            , ( 200, 100 )
            ]
      , id = 4
      , color = "pink"
      }
    ]
        |> List.map Lines.init
