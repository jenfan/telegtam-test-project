port module MapBoxes exposing (MapBox, Msg, init, subscriptions, update, view)

import Json.Decode as Decode
import Ranges exposing (Size)
import Svg exposing (Svg)
import Svg.Attributes exposing (..)


type alias MapBox =
    { x : Float
    , width : Float
    , height : Float
    , id : String
    , dragDeltaX : Float
    }


type Msg
    = Moved Float


init : Size -> String -> ( Maybe MapBox, Cmd Msg )
init ( width, height ) id =
    let
        boxWidth =
            toFloat width / 4

        mapBox =
            { x = toFloat width - boxWidth
            , width = boxWidth
            , height = toFloat height
            , id = id
            , dragDeltaX = 0
            }
    in
    ( Just mapBox, initListeners mapBox )


port boxMoved : (Float -> msg) -> Sub msg


port initListeners : MapBox -> Cmd msg



-- UPDATE


update : Msg -> MapBox -> MapBox
update msg mapBox =
    case msg of
        Moved deltaX ->
            if mapBox.x + deltaX < 0 then
                { mapBox | dragDeltaX = mapBox.x * -1 }

            else if mapBox.x + deltaX > mapBox.x then
                { mapBox | dragDeltaX = 0 }

            else
                { mapBox | dragDeltaX = deltaX }



--else
--    mapBox


subscriptions : Sub Msg
subscriptions =
    boxMoved Moved



-- VIEW


view : MapBox -> Svg Msg
view mapBox =
    Svg.rect
        [ width <| String.fromFloat <| mapBox.width
        , height <| String.fromFloat mapBox.height
        , x <| String.fromFloat mapBox.x
        , y <| String.fromFloat <| -1 * mapBox.height

        --, Attr.cursor cursor
        , fillOpacity "0.25"
        , id mapBox.id
        , transform <| "translate(" ++ String.fromFloat mapBox.dragDeltaX ++ ",0)"
        ]
        []
