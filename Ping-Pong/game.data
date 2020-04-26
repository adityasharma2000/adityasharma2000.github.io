--[[
    Fires only once
]]

WINDOW_WIDTH = 512
WINDOW_HEIGHT = 512
dt = 0.01
base_speed = 100

function love.load()
    math.randomseed(os.time())

    paddlespeed = 200

    player1score = 0
    player2score = 0

    ballx = WINDOW_WIDTH/2 - 2
    bally = WINDOW_HEIGHT/2 -2

    if math.random(2)==1 then
        ballvx = base_speed
    else
        ballvx = -base_speed
    end 
    ballvy = love.math.random( -100, 100)

    player1Y = 30
    player2Y = WINDOW_HEIGHT-50

    love.window.setMode(WINDOW_WIDTH, WINDOW_HEIGHT, {
        fullscreen = false,
        resizable = false,
        vsync = true
    })

    Statemachine = "Start"

end

--[[
    Called after Update
    The draw function
]]

function love.draw()
    -- love.graphics.clear(40, 45, 52, 255)

    love.graphics.setColor(0,0,255)
    love.graphics.printf(
        'Ping Pong',  --Text
        0, --Starting x
        6,
        WINDOW_WIDTH,
        'center'
    )
    love.graphics.print('Player 1',WINDOW_WIDTH/2-70,WINDOW_HEIGHT/3 - 20)
    love.graphics.setColor(255,255,255)
    love.graphics.print(tostring(player1score),WINDOW_WIDTH/2-50,WINDOW_HEIGHT/3)
    love.graphics.setColor(0,0,255)
    love.graphics.print('Player 2',WINDOW_WIDTH/2+20,WINDOW_HEIGHT/3 - 20)
    love.graphics.setColor(255,255,255)
    love.graphics.print(tostring(player2score),WINDOW_WIDTH/2+40,WINDOW_HEIGHT/3)
    love.graphics.setColor(255,0,0)
    love.graphics.rectangle('fill', 10, player1Y, 5, 20)
    love.graphics.setColor(0,255,0)
    love.graphics.rectangle('fill', WINDOW_WIDTH - 15, player2Y, 5, 20)
    love.graphics.setColor(255,255,255)
    love.graphics.rectangle('fill', ballx, bally, 4, 4)

    if Statemachine=='Start' then
        love.graphics.printf(
            'Press Enter to Start',  --Text
            0, --Starting x
            WINDOW_HEIGHT/2+20,
            WINDOW_WIDTH,
            'center'
        )
        love.graphics.printf(
            'Press R to Reset',  --Text
            0, --Starting x
            WINDOW_HEIGHT/2+50,
            WINDOW_WIDTH,
            'center'
        )
        love.graphics.printf(
            'CONTROLS',  --Text
            0, --Starting x
            WINDOW_HEIGHT/2+90,
            WINDOW_WIDTH,
            'center'
        )
        love.graphics.printf(
            'Player 1 - A S D W',  --Text
            0, --Starting x
            WINDOW_HEIGHT/2+110,
            WINDOW_WIDTH,
            'center'
        )
        love.graphics.printf(
            'Player 1 - Left, Down, Right, Up Arrow Keys',  --Text
            0, --Starting x
            WINDOW_HEIGHT/2+130,
            WINDOW_WIDTH,
            'center'
        )
    end
end


function love.keypressed(key)

    if key == 'escape' then
        love.event.quit()
    end

    if key == 'enter' or key == 'return' then
        if Statemachine == 'Start' then
            Statemachine = 'Play'
        elseif Statemachine == 'Play' then
            Statemachine = 'Start'

            ballx = WINDOW_WIDTH/2 - 2
            bally = WINDOW_HEIGHT/2 -2

            if math.random(2)==1 then
                ballvx = base_speed
            else
                ballvx = -base_speed
            end 
            ballvy = love.math.random( -100, 100)
        
            player1Y = 30
            player2Y = WINDOW_HEIGHT-50


        end
    end

    if key == 'r' or key == 'R' then

        Statemachine = 'Start'

        player1score = 0
        player2score = 0

        ballx = WINDOW_WIDTH/2 - 2
        bally = WINDOW_HEIGHT/2 -2

        if math.random(2)==1 then
            ballvx = base_speed
        else
            ballvx = -base_speed
        end 
        ballvy = love.math.random( -100, 100)
    
        player1Y = 30
        player2Y = WINDOW_HEIGHT-50
        
    end

end


function love.update(dt)
    if love.keyboard.isDown('w') then
        player1Y = math.max(0, player1Y + -paddlespeed*dt)
    elseif love.keyboard.isDown('s') then
        player1Y = math.min(player1Y + paddlespeed*dt, WINDOW_HEIGHT-20)
    end

    if love.keyboard.isDown('up') then
        player2Y = math.max(0, player2Y + -paddlespeed*dt)
    elseif love.keyboard.isDown('down') then
        player2Y = math.min(player2Y + paddlespeed*dt, WINDOW_HEIGHT-20)
    end

    

    if Statemachine == 'Play' then

        if bally <=0 or bally >= WINDOW_HEIGHT-2 then
            ballvy = -ballvy
        end
    
        if ballx <= 15 and ballx >= 10 and bally+2 <= player1Y+20 and bally >= player1Y then
            ballvx = base_speed
        end
    
        if ballx >= WINDOW_WIDTH - 15 and ballx <= WINDOW_WIDTH - 10 and bally+2 <= player2Y+20 and bally >= player2Y then
            ballvx = -base_speed
        end

        ballx = ballx + dt*ballvx
        bally = bally + dt*ballvy


        if ballx <= 0 then
            player2score = player2score + 1
            Statemachine = 'Start'

            ballx = WINDOW_WIDTH/2 - 2
            bally = WINDOW_HEIGHT/2 -2

            if math.random(2)==1 then
                ballvx = 100;
            else
                ballvx = -100
            end 
            ballvy = love.math.random( -100, 100)
        
            player1Y = 30
            player2Y = WINDOW_HEIGHT-50

        elseif ballx >= WINDOW_WIDTH then

            player1score = player1score + 1
            Statemachine = 'Start'

            ballx = WINDOW_WIDTH/2 - 2
            bally = WINDOW_HEIGHT/2 -2

            if math.random(2)==1 then
                ballvx = base_speed
            else
                ballvx = -base_speed
            end 
            ballvy = love.math.random( -100, 100)
        
            player1Y = 30
            player2Y = WINDOW_HEIGHT-50
        end

        

    end

    
end