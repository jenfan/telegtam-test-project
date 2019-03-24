port module MapBoxes exposing (MapBox, Msg, init, resize, subscriptions, update, view, viewBackground)

import Html.Attributes exposing (attribute)
import Json.Decode as Decode
import Ranges exposing (Range, Size)
import Svg exposing (Svg, g)
import Svg.Attributes as Attr exposing (..)


type alias MapBox =
    { mapWidth : Float
    , mapHeight : Float
    , x1 : Float
    , x2 : Float
    , dx : Float
    , width : Float
    , position : Range
    , id : String
    }


type Msg
    = Moved Float
    | LeftBoundMoved Float
    | RightBoundMoved Float


init : Size -> String -> MapBox
init ( width, height ) id =
    let
        boxWidth =
            calcBoxWidth <| toFloat width

        x1 =
            toFloat width - boxWidth

        x2 =
            toFloat width
    in
    { mapWidth = toFloat width
    , mapHeight = toFloat height
    , x1 = x1
    , x2 = x2
    , dx = 0
    , width = x2 - x1
    , position = calcPosition (toFloat width) x1 x2
    , id = id
    }


port boxMoved : (Float -> msg) -> Sub msg


port leftBoundMoved : (Float -> msg) -> Sub msg


port rightBoundMoved : (Float -> msg) -> Sub msg


calcBoxWidth : Float -> Float
calcBoxWidth w =
    w / 4.5


calcPosition : Float -> Float -> Float -> Range
calcPosition width leftX rightX =
    ( leftX / width, rightX / width )



-- UPDATE


update : Msg -> MapBox -> MapBox
update msg ({ mapWidth, width, x1, x2, dx } as mapBox) =
    case msg of
        Moved dX ->
            -- leftbound position
            if x1 + dX < 5 then
                { mapBox
                    | dx = x1 * -1 + 5

                    --, position = calcPosition mapWidth 0 mapBox.width
                }
                    |> updatePosition
                -- rightbound position

            else if x2 + dX > mapWidth then
                { mapBox | dx = mapWidth - x2 }
                    --| position = calcPosition mapWidth (mapWidth - width) mapWidth
                    --}
                    |> updatePosition
                -- working middle position

            else
                { mapBox
                    | dx = dX

                    --, position = calcPosition mapWidth (x1 + dx) (x2 + dx)
                }
                    |> updatePosition

        LeftBoundMoved x ->
            if x + dx < 3 then
                { mapBox | x1 = 3 - dx }

            else if x < x2 then
                { mapBox | x1 = x }
                    |> updatePosition

            else
                { mapBox | x2 = x }
                    |> updatePosition

        RightBoundMoved x ->
            if x + dx > mapWidth then
                { mapBox | x2 = mapWidth - dx }
                    |> updatePosition

            else if x > x1 then
                { mapBox | x2 = x }
                    |> updatePosition

            else
                { mapBox | x1 = x }
                    |> updatePosition


updatePosition : MapBox -> MapBox
updatePosition ({ x1, x2, dx, mapWidth } as mapBox) =
    { mapBox | position = calcPosition mapWidth (x1 + dx) (x2 + dx) }


resize : Size -> MapBox -> MapBox
resize ( w, h ) mapBox =
    let
        boxWidth =
            calcBoxWidth <| toFloat w

        x1 =
            toFloat w - boxWidth
    in
    { mapBox
        | mapWidth = toFloat w
        , mapHeight = toFloat h
        , width = boxWidth
        , x1 = x1
        , x2 = x1 + boxWidth
    }


subscriptions : Sub Msg
subscriptions =
    Sub.batch
        [ boxMoved Moved
        , leftBoundMoved LeftBoundMoved
        , rightBoundMoved RightBoundMoved
        ]



-- VIEW


view : MapBox -> Svg Msg
view mapBox =
    g []
        [ viewBox mapBox

        --, leftbound mapBox
        --, rightbound mapBox
        ]


viewBackground : MapBox -> Svg Msg
viewBackground mapBox =
    g []
        [ leftBackground mapBox
        , rightBackground mapBox
        ]


viewBox : MapBox -> Svg Msg
viewBox ({ x1, x2, mapHeight } as mapBox) =
    Svg.rect
        [ width <| String.fromFloat <| abs (x2 - x1)
        , height <| String.fromFloat (mapHeight + 10)
        , x <| String.fromFloat <| Basics.min x1 x2
        , y <| String.fromFloat <| -1 * mapHeight - 5

        --, Attr.cursor cursor
        --, fillOpacity "0.25"
        , fill "white"
        , fillOpacity "0.15"
        , stroke "#e5edf4"
        , strokeWidth "15"
        , id mapBox.id
        , class "mapBox"
        , strokeOpacity "1"
        , transform <| "translate(" ++ String.fromFloat mapBox.dx ++ ",0)"
        , attribute "dragx" <| String.fromFloat mapBox.dx
        ]
        []


leftBackground : MapBox -> Svg Msg
leftBackground { x1, dx, mapWidth, mapHeight } =
    background (x1 - mapWidth - 5) mapWidth mapHeight dx


rightBackground : MapBox -> Svg Msg
rightBackground { x2, dx, mapWidth, mapHeight } =
    background (x2 + 5) mapWidth mapHeight dx


background : Float -> Float -> Float -> Float -> Svg Msg
background x mapWidth mapHeight dx =
    Svg.rect
        [ width <| String.fromFloat mapWidth
        , height <| String.fromFloat (mapHeight + 10)
        , Attr.x <| String.fromFloat x
        , y <| String.fromFloat <| -1 * mapHeight - 5

        --, fillOpacity "0.25"
        , fill "#f8fafe"
        , strokeWidth "0"
        , fillOpacity "0.7"
        , transform <| "translate(" ++ String.fromFloat dx ++ ",0)"
        ]
        []
