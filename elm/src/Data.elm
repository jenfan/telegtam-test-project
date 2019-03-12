module Data exposing (initModels)

import Lines exposing (Line)


initModels : List Line
initModels =
    [ { points =
            [ ( -100, 50 )
            , ( 100, 50 )
            ]
      , active = True
      , id = 1
      , color = "green"
      }
    , { points =
            [ ( 100, 0 )
            , ( 300, 0 )
            ]
      , active = True
      , id = 2
      , color = "red"
      }
    , { points =
            [ ( 200, 75 )
            , ( 300, 75 )
            ]
      , active = True
      , id = 3
      , color = "blue"
      }
    , { points =
            [ ( 200, 0 )
            , ( 200, 100 )
            ]
      , active = True
      , id = 4
      , color = "pink"
      }
    ]
