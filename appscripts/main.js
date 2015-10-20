require.config({
    paths: {"jsaSound": "http://animatedsoundworks.com:8001"}
});
//http://speckyboy.com/demo/windmill-demo/index.html
require(
    ["jsaSound/jsaModels/jsaFMnative2"],
    function (lalalaFactory) {
            
       var lalala = lalalaFactory();

        lalala.setParam("play", 0);    //or// lalala.setParamNorm("play", 0.500);
        lalala.setParam("Carrier Frequency", 527.02);    //or// lalala.setParamNorm("Carrier Frequency", 0.409);
        lalala.setParam("Modulation Index", 1);    //or// lalala.setParamNorm("Modulation Index", 0.010);
        lalala.setParam("Modulator Frequency", 30);    //or// lalala.setParamNorm("Modulator Frequency", 0.150);
        lalala.setParam("Gain", 0.25);    //or// lalala.setParamNorm("Gain", 0.250);
        lalala.setParam("Attack Time", 0.05);    //or// lalala.setParamNorm("Attack Time", 0.050);
        lalala.setParam("Release Time", 1);    //or// lalala.setParamNorm("Release Time", 0.333);

        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        var pWidth = paper.canvas.offsetWidth; //width of the canvas
        var pHeight = paper.canvas.offsetHeight; //height of the canvas
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        //created a rectangle to hold the background image for game
        paper.rect(0,0,pWidth,pHeight).attr({
            //dimensions of the box will be the width and height stated above, coordinate of where the box starts is at (0,0)
            'fill': "url(http://cdn.shopify.com/s/files/1/0337/7469/products/35262877_Web__13969_1024x1024.jpeg?v=1403721503)" //background image
        });

        var counter = 0; //counter for the number of clicks
        var tcounter; //counter for the timer - pre-defined before being called up under the start function later on

        //created circle and text to form the start button for the game
        var startButton = paper.circle(300,200,40); //radius of the circle: 40, coordinates of the circle: (300,200)
        var startText = paper.text(300,200,'START!');
        //attributes of the start button
        startButton.attr({
            stroke: "black",
            fill: "red",
            "stroke-width":5
        });
        //attributes of the text within the start button
        startText.attr({
            "fill":"white",
            "font-family":"Impact",
            "font-size":20
        });

        //when ready function is called, the start button will show up
        var ready = function(){
            startButton.show();
            startText.show();
        }
        
        //randInt function is used to randomize the starting position of the ladybug when the game starts
        var randInt = function (m,n) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        //variable 'dot' or the ladybug target created off the paper so it doesn't show up until the game starts
        var dot = paper.circle(-200,-200,40);
        dot.attr({
            fill: "url(http://img.photobucket.com/albums/v91/d2b_harrypotter/rsz_cute-ladybug-with-heart-spots%201.png)",
            'stroke-width': 0,
            opacity: 1
        });

        //'moveBug' function created to manually "animate" the 'dot' or the ladybug
        var moveBug = function(){
            //dot.xpos is the x coordinate of the bug, and it increases by dot.xrate (defined later when the game starts) everytime this function is called
            dot.xpos = dot.xpos + dot.xrate;
            //dot.ypos is the y coordinate of the bug, and it increases by dot.yrate (defined later when the game starts) everytime this function is called
            dot.ypos = dot.ypos + dot.yrate;
            //x and y coordinates of the bug change everytime this function is called
            dot.attr({
                'cx': dot.xpos,
                'cy': dot.ypos
            });

            //'if' conditionals to prevent the bug from moving off the paper by reversing the xrate and yrate accordingly
            if (dot.xpos > pWidth) {
                dot.xrate = -1*dot.xrate
            }
            if (dot.xpos < 0) {
                dot.xrate = -1*dot.xrate
            }
            if (dot.ypos > pHeight) {
                dot.yrate = -1*dot.yrate
            }
            if (dot.ypos < 0) {
                dot.yrate = -1*dot.yrate
            }

            lalala.play(1);

            lalala.setParamNorm("Carrier Frequency", dot.xpos/pWidth);
            lalala.setParamNorm("Modulation Index", dot.ypos/pHeight);

        }

        //start function for when the game starts
        var start = function(){
            console.log("game is starting"); //print console log to test if function is successfully called

            //start button is hidden once the game starts
            startButton.hide();
            startText.hide();

            //variable 'difficulty' defined as a prompt box stating game instructions, which also allows user to input a difficulty level ranging from 1-3
            var difficulty = prompt("You have 10 seconds to hit the ladybug as many times as you can! Now enter your level of difficulty from 1-3:", "1");

            //variable created here to be defined later on
            var myMover;

            //rectangles of varying sizes are created and filled with different flower images, created to obstruct the target at different x and y positions in different difficulty levels
            var flower1 = paper.rect(230,270,128,128).attr({
                "fill" : "url(http://www.i2clipart.com/cliparts/b/5/8/3/clipart-sunflower-b583.png)",
                //stroke-width set to 0 for all the flowers to remove the default 1px black stroke around the fill image
                'stroke-width': 0
            });
            var flower2 = paper.rect(60,10,128,128).attr({
                "fill" : "url(http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/flower-icon.png)",
                'stroke-width': 0
            });
            var flower3 = paper.rect(300,100,272,266).attr({
                "fill" : "url(http://users.atw.hu/etelkad/images/AKS_sakuraflower.png)",
                'stroke-width': 0
            });
            var flower4 = paper.rect(20,200,128,128).attr({
                "fill" : "url(http://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/128/rose-icon.png)",
                'stroke-width': 0
            });
            var flower5 = paper.rect(200,40,128,128).attr({
                "fill" : "url(http://www.i2clipart.com/cliparts/6/3/8/a/clipart-orchid-638a.png)",
                'stroke-width': 0
            });

            //all the flowers are hidden first because they will be called individually later on under each 'if' conditional for each difficulty level when it's keyed in the prompt box
            flower1.hide();
            flower2.hide();
            flower3.hide();
            flower4.hide();
            flower5.hide();

            //code under each 'if' conditional is executed when the corresponding strings "1", "2", or "3" is keyed in the prompt box (defined as variable 'difficulty')
            if (difficulty==="1") {
                //difficulty level printed to the console to test if the correct 'if' conditional is called
                console.log("Difficulty level " + difficulty + " selected.");
                //'myMover' variable defined as a function to change the x and y position of the ladybug as defined in the moveBug function every 8ms
                myMover = setInterval(moveBug,8);
                //only 2 flowers as obstructions (shown after 'myMover' function is called so they block the ladybug) at level 1, and more are shown as difficulty level increases
                flower1.show();
                flower2.show();
            };

            if (difficulty==="2"){
                console.log("Difficulty level " + difficulty + " selected.");
                //'myMover' variable defined as a function to change the x and y position of the ladybug as defined in the moveBug function every 4ms (faster than 1st level)
                myMover = setInterval(moveBug,4);
                flower1.show();
                flower2.show();
                flower3.show();
            };

            if (difficulty==="3"){
                console.log("Difficulty level " + difficulty + " selected.")
                //'myMover' variable defined as a function to change the x and y position of the ladybug as defined in the moveBug function every 1ms (faster than 2nd level)
                myMover = setInterval(moveBug,1);
                flower1.show();
                flower2.show();
                flower3.show();
                flower4.show();
                flower5.show();
            };

            //sets the game to start at default difficulty level 1 (and with an alert box to alert the user) when user input in the difficulty prompt box is not string "1", "2", or "3"
            if ((difficulty!=="1") && (difficulty!=="2") && (difficulty!=="3")) {
                alert("Invalid difficulty input! Default difficulty level 1 selected.");
                myMover = setInterval(moveBug,8);
                flower1.show();
                flower2.show();                
            }


            counter = 0; //click counter will start from 0 when each round of the game starts, and counts the number of successful clicks within 10 seconds
            tcounter = 0; //time counter will start from 0, and count up to 10 seconds - time duration for each round

            //'myTicker' is a periodic timer functon created to limit each round of the game to 10 seconds
            var myTicker = setInterval ( function() {
                tcounter++; //referring to the '1000'(ms) line of code below, tcounter clocks 1 count every 1s when 'myTicker' is called
                console.log("Ticker count is " + tcounter); //print console log to test the following 'if' conditional (if the game stops accordingly after tcounter===10 or when 10 seconds is up)
            
                if (tcounter===10) { //when tcounter===10, the game will end
                    lalala.stop();
                    clearInterval(myTicker); //'myTicker' is cleared so that tcounter will start from 0 at the beginning of next round
                    clearInterval(myMover); //'myMover' is cleared to reset the movement (speed) of the ladybug to follow that of the difficulty level selected in the next round
                    dot.attr({ //ladybug is moved off the paper until the game starts again
                        'cx': -200,
                        'cy': -200                    
                    });
                    confirm("10 seconds is up! Your click count is " + counter + "."); //pop-up box to indicate end of the round and the score

                    //all flowers are removed to start afresh the next round
                    flower1.remove();
                    flower2.remove();
                    flower3.remove();
                    flower4.remove();
                    flower5.remove();
                    ready(); //ready function called to show the start button
                }

            }, 1000); //myTicker called every 1000ms(1s)

            //dot.xrate and dot.yrate defined so the x and y corrdinates of the bug move by 1px each time
            dot.xrate = 1;
            dot.yrate = 1;

            //randInt called here to randomize the starting position of the ladybug when the game starts, with x coordinate starting anywhere between 0-600 and y coordinate between 0-400.
            dot.xpos = randInt(0,5)*100;
            dot.ypos = randInt(0,3)*100;
        }

        //'click' event on the start button calls the start function
        startButton.node.addEventListener('click', start);

        //'click' event on the ladybug increases the count of the (click) counter
        dot.node.addEventListener('click', function(ev){
            counter++;
            //print console log to test if the clicks on the ladybug are being counted
            console.log("Your click count is " + counter + ".");
        });

        var startup = new Audio("resources/start.wav");
        startup.play();

    }
);