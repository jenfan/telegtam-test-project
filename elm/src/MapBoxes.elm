port module MapBoxes exposing (MapBox, Msg, init, resize, subscriptions, update, view)

import Html.Attributes exposing (attribute)
import Json.Decode as Decode
import Ranges exposing (Range, Size)
import Svg exposing (Svg)
import Svg.Attributes exposing (..)


type alias MapBox =
    { mapWidth : Int
    , mapHeight : Int
    , width : Int
    , x : Float
    , dragDeltaX : Float
    , position : Range
    , id : String
    }


type Msg
    = Moved Float


init : Size -> String -> ( MapBox, Cmd Msg )
init ( width, height ) id =
    let
        boxWidth =
            calcBoxWidth width

        x =
            toFloat (width - boxWidth)

        mapBox =
            { mapWidth = width
            , mapHeight = height
            , width = boxWidth
            , x = x
            , dragDeltaX = 0
            , position = calcPosition width x (toFloat width)
            , id = id
            }
    in
    ( mapBox, initListeners mapBox )


port boxMoved : (Float -> msg) -> Sub msg


port initListeners : MapBox -> Cmd msg


calcBoxWidth : Int -> Int
calcBoxWidth w =
    w // 4


calcPosition : Int -> Float -> Float -> Range
calcPosition width leftX rightX =
    ( Debug.log "leftX" leftX / (Debug.log "width" <| toFloat width), rightX / toFloat width )



-- UPDATE


update : Msg -> MapBox -> MapBox
update msg ({ mapWidth } as mapBox) =
    case msg of
        Moved deltaX ->
            -- leftbound position
            if mapBox.x + deltaX < 0 then
                { mapBox
                    | dragDeltaX = mapBox.x * -1
                    , position = calcPosition mapWidth 0 (toFloat mapBox.width)
                }
                -- rightbound position

            else if mapBox.x + deltaX > mapBox.x then
                { mapBox
                    | dragDeltaX = 0
                    , position = calcPosition mapWidth mapBox.x (toFloat mapWidth)
                }
                -- working middle position

            else
                let
                    lPos =
                        mapBox.x + deltaX

                    rPos =
                        lPos + toFloat mapBox.width
                in
                { mapBox
                    | dragDeltaX = deltaX
                    , position = calcPosition mapWidth lPos rPos
                }


resize : Size -> MapBox -> MapBox
resize ( w, h ) mapBox =
    let
        boxWidth =
            calcBoxWidth w
    in
    { mapBox
        | mapWidth = w
        , mapHeight = h
        , width = boxWidth
        , x = toFloat (w - boxWidth)
    }


subscriptions : Sub Msg
subscriptions =
    boxMoved Moved



-- VIEW


view : MapBox -> Svg Msg
view mapBox =
    Svg.rect
        [ width <| String.fromInt <| mapBox.width
        , height <| String.fromInt mapBox.mapHeight
        , x <| String.fromFloat mapBox.x
        , y <| String.fromInt <| -1 * mapBox.mapHeight

        --, Attr.cursor cursor
        , fillOpacity "0.25"
        , id mapBox.id
        , transform <| "translate(" ++ String.fromFloat mapBox.dragDeltaX ++ ",0)"
        , attribute "dragx" <| String.fromFloat mapBox.dragDeltaX
        ]
        []
