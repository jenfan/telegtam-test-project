module Data exposing (initModels)

import Lines exposing (Line)


initModels : List Line
initModels =
    [ { points =
            [ ( -100, 0 )
            , ( 100, 0 )
            ]
      , id = 1
      , color = "green"
      }
    , { points =
            [ ( 300, -50 )
            , ( 1300, -50 )
            ]
      , id = 2
      , color = "red"
      }
    , { points =
            [ ( 100, -100 )
            , ( 200, 100 )
            ]
      , id = 3
      , color = "blue"
      }
    , { points =
            [ ( 200, 0 )
            , ( 300, 100 )
            ]
      , id = 4
      , color = "pink"
      }
    ]
        |> List.map Lines.init
