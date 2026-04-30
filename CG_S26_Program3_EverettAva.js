
// --- Uniform location handles (filled in during init) ---
var uAngleZLoc, uAngleXLoc, uAngleYLoc;
var uDeltaXLoc, uDeltaYLoc, uDeltaZLoc;
var uScaleXLoc, uScaleYLoc, uScaleZLoc;
var uLocalXLoc, uLocalYLoc, uLocalZLoc;
var uColorLoc;

// -- Animation timer and values ---
var animTimer = 0.0;
var lastTimestamp = 0.0;
const SWING_DEGREES = 45.0;  // how far the stick swings each direction
var songBPM = 196;
var jumpVal;


// --- Camera Controls ---
var cameraAngleY  = 0.0;   // current Y rotation (radians) applied to whole scene
var cameraAngleX  = 0.0;   // current X tilt
var targetCameraY = 0.0;
var targetCameraX = 0.0;
const CAMERA_LERP = 0.08;  // lower = slower/smoother

const CUBE_FIRST    = 0;
const CUBE_COUNT    = 36;
const PYRAMID_FIRST = 36;
const PYRAMID_COUNT = 18;
var cubeSize = 0.1;



var miku = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAvVBMVEUAAAAAUHYmmaMRGzkbf5g4tKwIFBIeIiv+7+bwtrb31s0LSGcXIz/p5GIp2NEq2tAxKDVILD0yJzXpUHiAOVFnM0ggj7HjozbadkIbbrL////G4uoAP2dhn6tMLT9GLD3mJE3udnpZMEMqJjJAKjo0OTwWj5cmy8QdqqsfISQivrrYLHwWkZgPdYMQEy4QGDUPEi3i4ecAAACbHVcAHU0kL0oBAAbZ7NulqbXN0NkiJC+23dENCyOGw8KSzsezoHxXAAAAAXRSTlMAQObYZgAAA7dJREFUeNq1lol2mzoQQGcGcAR225ele/v2tQ1xsGMwBs3/f9abkVgMKcbuOb1nohGydBmQ4mNo4e2GebNla1mwFsZwDpAzMIMg7ZjtdkO02W6nBPxVBV95UrDZoLCRMtAFjMjzpp1C1ESsIJEKLuXQwBQLxFOfwxRMKBBz7GC4FK6YSBpMEmOSBC8XeERghGnB4RaG6P4feMBBz0N7LnT/DyMH5NyeC93/vDhwwWwdLN1DkW+FnFlywdAIyFpqBMCFjmuGPGcRVGRZJ7ClSgScCxVxoS3ATwBWP2SS5C6p0nHNgE9c4YEQMRYk0QErfkJ8IuTqCQkB4Gfg9oAx/AIASDquWQTSl8DVKo5XK0R3qQLNXvD67pqIgQiY6Pru9UBgtQJOcPXxUxx/+rjChLUCa58qrcBWCHB3e4OSgAAQb27vJFU6rhlkGjvBh8/GfP7QCHRCgbbAqiAo6PqGCBxEN9dUABUyTiwZrGUJxHb/EVmHBPbBIPHHn7+7/XcaHRLAh7IMgiCKohAakNAYaYI6qCUCaJAb+FljgucCQQQNvSCOjJ+FAk0K4tIRnxIQQC9YPhO8MuaVCCYfoa9AFy+XtcwTJC31QLUCf7CwLKUxjsRhzFEFJgyNWXYYLB3/fPFZBGWWlacEntghHSodX1KfiawKLI0EPZEndEhHBPt9Wf6banYCLku2NLzP0Tu48iwc0tnLQlmapntJKuEqyyrehwNAV08KdGGaanICrYD3w2nHFej1ouPK7pXyv7R0HWu5FNhevXg5EBA0OHEUdRVgEKxr/wj1OggQrfPg1bv3/Y1GAuVY8FivNdb1owroYb1+IBxVIAwFdS/Y1fVj/ShR1zsRPNQPErh4+2bRc1yBLOtrE5MKPCqoa9QO6g2GgqlzIGe6Fxz1h9O8YJ4AAgl4zpxgHhQIfiDzjyDQYGKbzmRUfwhhm3B8pybDkOlXQABlmWVwn2VlCUDUDF+yC73gO3ehhDK7v88kgVK5GB2kWe5TOIm1Fk7y15wApgTo09/p6V2wdkaQwoyACAgm2cFOounXOwkYf6EQnDIEIpBGWYhCVbL6IkEgccb/w9T6IFiGUb/biTHf2nucLkA4FsQiMNFMBZcLlMseYZrBC2t+J7S/GxLFNCQTghDCrrP0mPZ3w0gwT6yYjrgV/PbrmYJQiTrCgTCGefxR61iEA0Y3CM8QOLqrcyvQJf6vE7x8cYkgigYVqOH9O724/B18XwX1SKC8eastwKywu6VvRowqXJxxDua27X9vNLBJUznaFgAAAABJRU5ErkJggg==";
var rin = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAP1BMVEUAAAD/3Iv/y3L/77/96tz94M7////+8//+23mNTkVDf5CK0O79ybSWW1X2s2R2S0a53Ov9/t/HvbHokknrim/BE3XyAAAAAXRSTlMAQObYZgAAAn9JREFUeNrdlotyozAMRXWNkZNNZff1/9+6khB1IZCEdHY6s6e2LHXCiQmMbZrBCjpKSmkYNDwtAAYFQB6V/PwM/pmAmSPsULgoXHYFpbB12oMnAe8JiNn7LkgJ3rMDehQYpSCIvBNfHlxXhISU/KKkuECHBG02TgLtCcOA5PWWgIE0KgngtcBhBhiqONGKIQ0pMQ9pdNLAnJL+U5uP8QhPAyUGDzhpsSHQcD6P4/msybWgcPGr7HMnLa5vQcOZ/+TxD5/neh5DcAI5uCG45HzZECRKzNwFWiRKRBp8xMxLVl6whkAaSryDoKnuoyNKVSiQ2nJuVWYosFc0Z1rwPwjaF9LTSRD5FMYF1JGJNoesCIRZ4PmXIOdxtGb9nqAKRFsNWWsuc1Swuo1xBXJGqVK1FcvNJSHoUMeU33sBSikVqKVYLgJF9gV9alNgXxirOYrn4riyVtigCXWs9B4JGxXMkarEexOxJ2WDJtSx0nskxa6BCeBpCY28XqRz4ykUX99NUDy1aINcXh8TjDs8PAN7EsvujDdmwM7b2yRA9b/3d4sf+Ii6ygLaAKAfAeVXBc/fQnN6RUcRp1ceSTy4kppCB8ViJpnT1qw4hmjrLjkuqNYckYiHgAkQBoMOUuGSBY9afBEgMGNKS2EfhOjIekDMVCwNDghohxuCFhwX9JcX6C/1Dliw/YndzTY21dtA+T3Bz2/hvQXv00aDFmB9LtijilOJ4n2YWZ8LdvEtE7Qt2NqVPz9pm3FFXkD3sW/sc87HBTkvrhrjQFDhge7TzwrwFgeCJh4eWB6+nxW8TcTeSmSxZxu/+lUdvF6eFdyfQQuenMF6PXhT2OmCzvW68Bc1SkMmJ3v5wwAAAABJRU5ErkJggg=="
var len = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAArlBMVEUAAACMkaV3e5/7/bRhZJn+mpr/8LXro5fghX7/2q39/eP////h5vp0eqwAUHb7/bL//+7+/f/Y4//6+/8wOl3++7b9vY3x9NXG4upgo7T/u5L+/rb//9H9/7vo7Or//9j//+Ht8d6L277/8rH/xqv44KDp7P+ksLj/t6j+x6nyy4hxdKvTy/1xfLLurGiKnLB9iK3/w8//4N7/8+f37Kro5v769/6Km62Gw8ImmaO4fIlEAAAAAXRSTlMAQObYZgAAAzxJREFUeNq9lgtjmjAQxxO0SQDnVmefa7utXa2KD14G+/2/2O4uSaOgsmq7n5FckPtzl+AR5hAOaQ7svYhIRgJaaATC9wsIFQklAEXtGAFhBaQ8RiC2CJkBUuz7vT2FjDh+ElWeF0We994vYAF/oEWg933bMRae+pDyZ57GMBIiigUcQ0KAGWMucAbtyHvIMJQ7BEKJAkKG0MCGhgIK7cEgkqH1CPGEkNB5gVCQLi5/LJVSGQCdjJV5FuRgAD1DvjHx9pzAoCYgqanhMMuGQwW2a2Abgau7X1IKJiUTUv68u2IGE15IwrlS1zdZdnOtVA+GmIKCAzQG/L5/UAp6UFPq4R4FCFKPlAhBIM/jx6J4jOEJIMcoAgEZqcik0JPS+sgepeARUkB4Knfr3+vhGCfM9PX13wnnQbfT6ZwxS7pMl9BS/pV/+cI5ZxatV0WR/ZMAPs4gwOsCMxR4XTP2Sqz3CWQokB0SIN82gUMp+Ag40gm6RHDJU8ClgLj50MSK0BoEXAQXnN/ect4lOL8Ya50kL8uiWL4kidbj8dMf4Gm8Am8P8/DLH5CBiyDgGlmmo1G61MZOltB0LQKfQsdwRoChDaOR9oCHLokFUZYbk8iBWgQIXPu8JVARc6KqNiIoTAnLCLAxQBLwIRN0nbuscCu4NwUS8DRT8HDErwI3N55NJhCKp5nCep/AvgjSqkpTJ5BuCASIn8RAGyYTrZsRpHMirTYFyK3rCGbIipht2uV0WpbTBTEtDzwHHKH/gANsOFEQGVEU7FR8BMcCvqdhb/9hEXSOnYOmbydhWySJKSiJxoKkXWWq395VLeqJ83N2kPW6ZQpaBeDjaURAPLNNKsLZFMFJrF+B09YRP58pYIuOp8LU/QDp9/u+oDACjUNUW13f+AQBlmVXXayAe3l4uwlF8El0ISgsLm8xaA1F5ASB2f8UOD0FU5u5JeiuEG1xq6HbBPgbKGA1NpYTtOyh+W90b2kiaETQjn0/OM4WSGlZsDrtEcyRyjJnBjdmO3D7hK19gxtmH55C+yrUUjhaILXbA18hzdfBLX4SHUYgrYh0Xq8LjoBmHL8kQAp4AMtuCOz24IhJzJCC2LnV/ws3i85ynQRyOQAAAABJRU5ErkJggg=="
var luka = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAh1BMVEUAAACCgoL/////9+j86ePy7OHH9v/v59vf5uvy38vy4L31zcbd18zryrLmzaii3vzTxbfmtqHxrKzOtqXUtoybt73ZnY/viqTHoXW4jGXja5N9kp7fXYmhgWyweFjZV4+MalZqb32MT3tVWWt4UD2AQGZ1MlNCRVdZOC4xM0VeHTUmJjMAAACcJ39UAAAAAnRSTlMARAciSLEAAAOVSURBVHja7ZZhc+MoDIZzta9XG0NilhZBm9St01IV///fdxIME3edmTjbmf2yqwFEGL9PEBijTTErrNbUeOu1pmZzrQlSkVZYonBzNcDaZ++fiWF1XWvrnzeHzeN0BSCosW1HFawWdS2I8OA29/Gf9QAzqpcXNRpvZdNI620Pn1v8WA/QOQStpawaKcmb99twvAbAi3gCiEa93Y3DeoAtJjmE3tZV+3rzsl8hFDYYra0tprUJNFjei8uAWhsU4gQQAo2uLY0LoesZgIHnYq81Qi00z51mzrsISINUakHNSc9AexYAjgE5dgY4+AoAlpf3gxHwFQDx1glt3z+r5vOdnnO3Ec4BNrUgtwQIN20PQr/dPVbN492bFoftREAtbC2sYICjykJB/ukpD8yXxrsDRfd6c1819zevFOnBeW1pXAhfgibh3M/N5wNc9p+EOg0tjvVTbs5axBhAgfv52+DAKGVO47tudxyO07QAYIzRtAZmOy4EIVjfqtN49283NMMZAOlxDvC2aprKejDdf123AhAixnkI3jdSNt472HXd7kIIHD8DiofdDryPUkbvuV/Wg1E7KtnNIDFgoBKLdz9+OOsB0VvL/XImwACAcVS5zACYhVg8/6vGAFurNffLGzkM+1KofplBRKSmeN44LcyotNDcL4A8A1jOAAyNTLwGU4wTQhhDCPXYqlboQD8KoJey76lkNwOwbEob3ipF6CQaX8aWRAwrgIe+f3igkt08BIxkSDp6GlMP0Y4cAnK/AD6Ox48PKtnNAMYoKuCcAyrKpBlFTJ857pdTaYZbfi5FrMwMwHoTJ9ZTbU3ENA2+Yjz3y6k0+60xrSEIuzkgj+QVpg7vKOnHdgwe+Uc+lWiGfQIoQ24xA4yszgAWBdV2KuvR833h0ewHUuYQvgByUBw/VwXsyxnIfeO9AXcchuORSnYE+Gt/7U8zkZtfN70RgprNtxDfM/4ebH6z8TXnQMHsUu2b/oqPSEBE/rzNrnVZySsApA/fAnAEvxwCx58A2cdFXnDJSBNCdH3v2AdMF87pVl4DmEKYQEpgH3CRF1yyiCSEvmkqIADGRV5wyaY4IZoDXyjO0Y+cEHDhugLAWYmJIV9rRFnkBZfXgJUjJsIYMClLZrIGkK95la9hBS4pOW2UVPs1ACZM0SRCCy4pK1azWwFIy31KBCAruV0JYD1ELKkIpBDKDNaEkHOCkgyVNejZnT0P/wPmW6LCQfNg4gAAAABJRU5ErkJggg==";
var meiko = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAP1BMVEUAAACBaExMPSiggV5ZQy1tVTvcr5Hdyao9NSKxe1xgTjXi2L9/JCUzJhhRCg+9OjueKTGhb1Z5TEFsEx2BV0yqKmepAAAAAXRSTlMAQObYZgAAAnRJREFUeNrtltuyqyAMQMNFQDaVWPr/33oSQsXu3tRO99NZY6Mw6eLmIHBFNXQD9qKMUfT7SGAsCayu2GOCwShlK+qIYOAeGOe8d84c6sGHAplEKwK7XyDsF6gn2MZWgTG2YsxeAc+bMqYLWoWy5KAABgSqBLUU7gTWhpEI1nYBUQVG8gYFg5HnXQJQoDhvgAHIAFzB2BYkTemg4zhGulHxdg7EoAZgmnAF5xsS6B/lvfrRJODWu6CNeIDKIEXCagBtAShHlkDWXxaCom70liQ8JBEhhBM0pkZqQMP75Nz4DUEm1oJEz6cQUm58V5AXUoU73gRcWvAVqRrXEmS6QEY+VrYJnDDP8/l8plgKCzzBglLKVCkikMwHAk8NXi6XcZ5TxRGJEQlJnwq8IAKKqYIhYLphnfZGwNOBOSM/HBVkdA7zNkGuRK11qAsnAk9sFERN5EzhxGuv59kRnnDETIzEPCM2IS9JgY6OBDfP0I0tndMCYkDEB4IoyBAoyhCE+yHI63IzBC1IaxS74OUc/Oc3GW5J/dbpVQXWIF24GNIkdQHowpqdKqVlPxFg3045ijC32kLAPnJ2AC5nOAxm6cBxMl87iBEOE2/+rrXMQY8pSXxhWCv0q1HtYP1BShUWfJMY11PwOYngzWUpez8695eCTPy1IOfe/bzQzgt9R51+bRSlCxABcEqLAJnpiQDvBSgCSqiHhNWhoRaughneU7+w/ioYL8cE6092L1Ppa4IYPxSIImoNUL+wcVnGsLUH8iPB6STnBSLy174uoyxsKdOG/SEwWk4N9BCqABHDdgG33Q8N9b24DuG8YT+oh4TVoeHdHPwDBxI+E4zZ/CYAAAAASUVORK5CYII=";
var kaito = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAWlBMVEUAAABagsZpnM9UbrpwrNQ0MEItKTc8OVHuzcTx2MvpwLtVV3FISGBAP1FbYH314tNMdLaLrtFyf7o8O2fvx23prltNhbtKcbJBRX5GU5JIYqKws8TM0Njt6tsaXwfRAAAAAXRSTlMAQObYZgAAA3FJREFUeNrtlu2SmzgQRdWtL2wc7yYDNqDu93/NvWqBl4zHGZczu79yDKIl0KkLGAq3sWzQNM/TvLgn2QvmBWC2LS8I5mmCYlp5NcHrAgQA8xckOBrTy9fguPKCoNF1B9B1z098yAyWxW0sjwVXpMfx7Q+0YL3uNA7M7sZ9d7lcL9clL+BqE+NyxRB62IPGrdRBLO4OHHtZ5poXgiM26GAI02eMQ+RAxoqRv93VOhZ8O7HlOiMA4r+9XZe3N5xGtiE0l8vcEozOoY/GYbx2AVyXCxoTxJznWX50hx8yzznHTVC31RAH7HcG9g9xTXAxJ67akmKcJv1++Ou7TlOMCUNgutrWgeh2oGMCxDHBPOF37Lb7n5IN3O6K23Hn2vAkmoBboSKiUsiTAvJuRQPn7ujuKf58eic4HCAQ6gGJWxmZ8qF7StABCHwP/E0wMD2d4HiUe4EGvk/gi5QqAKpCnsAmWGsV1DqOCoERdC9QFaG+CdSvaM63mjgQRsZBVcnQnwRSxf03YFfcqEH8VhMxeipaExqyFwxFCQGqQERoUAKMH2UCqqgLsWrRHTvBKOL92a5BKaqjVkIGQY3AQRh1sQjGTwIq3PfnviVQJa1wzDmylRICCxyWQFb2Ai3hBKqgFNEGxZgSqRFCW0VBMXQvEE4pxdQEda4ATjCwVEpgVQ4kRjFEdgJPGcQEvBcRKoASaBVXAXH9MW8C3guizW8weUyDJffnTCIQEBdsVwF5g/aCmCJYDSi8An8CVkEg9g81wXbYXpDe4QX4HrRqe6Rz5dAZh+z+8NWIuHdoaxpkixsH55gdQPsZ3hP56Azy6JP7FUTuDqZb1ZovQd0dH9t123wlKqowvq7WcXgsyO5/IBCHcOu4HSkC9ynR2Gr3H6NCPgG3wkGPXXbPczr7shcQj93h9wTD7yXgoM8n0BOAoEjxnkQZQLB+HjzxTjBBTyL2saBKFVUdIFByBkM0jLa9R7+BnoOqIMEqEEUXCz3xTpAqQARSOwXRjaLAfU6xa3D2XmQYME2ABSi1+dXjyLsE/bnvudTrJo2WQOSZBHYKIBQilWIoMIlbaf3HghRTSmxTDFm5Cdpd+fCV4BOIGZAXEd8EzEzMEHxOAs0QvSdOvkJNQN6thMAUwrunPf0riBVrV18T4JBGXHmUYM/6QVD58Ev9Hynvbc+3R6d+AAAAAElFTkSuQmCC";

const CAMERAS = [
    { name: 'Front',   angleY: 0.0,               angleX: 0.0  },
    { name: 'Side',    angleY: Math.PI / 2,        angleX: 0.0  },
    { name: 'Top 3/4', angleY: Math.PI / 4,        angleX: -0.4  },
];
var currentCamera = 0;


const VOCALOIDS = [
    {
        name:   'Miku',
        skin:   miku,
        video:  'https://raw.githubusercontent.com/EverettAM/GraphicsProject3/main/connectcommune.mp4',
        glow:   { r: 0.0, g: 0.9, b: 0.8 },   // teal
        bpm:    156,
    },
    {
        name:   'Rin',
        skin:   rin,
        video:  'https://raw.githubusercontent.com/EverettAM/GraphicsProject3/main/doublehelix.mp4',
        glow:   { r: 1.0, g: 0.5, b: 0.0 },   // orange
        bpm:    190,
    },
    {
        name:   'Len',
        skin:   len,
        video:  'https://raw.githubusercontent.com/EverettAM/GraphicsProject3/main/helloyellowgalaxy.mp4',
        glow:   { r: 1.0, g: 0.95, b: 0.0 },  // yellow
        bpm:    190,
    },
    {
        name:   'Kaito',
        skin:   kaito,
        video:  'https://raw.githubusercontent.com/EverettAM/GraphicsProject3/main/rainysnowdrop.mp4',
        glow:   { r: 0.1, g: 0.3, b: 1.0 },   // blue
        bpm:    192,
    },
    {
        name:   'Meiko',
        skin:   meiko,
        video:  'https://raw.githubusercontent.com/EverettAM/GraphicsProject3/main/onandon.mp4',
        glow:   { r: 1.0, g: 0.1, b: 0.1 },   // red
        bpm:    126,
    },
    {
        name:   'Luka',
        skin:   luka,
        video:  'https://raw.githubusercontent.com/EverettAM/GraphicsProject3/main/treatme.mp4',
        glow:   { r: 1.0, g: 0.3, b: 0.6 },   // pink
        bpm:    119,
    },
];

var currentVocaloid = 0;  // index into VOCALOIDS

function switchVocaloid(index) {
    currentVocaloid = index;
    const v = VOCALOIDS[index];

    // --- Swap skin texture ---
    const img = new Image();
    img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, window.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    };
    img.src = v.skin;

    // --- Swap video ---
    videoEl.src = v.video;
    videoEl.load();
    videoEl.play().catch(e => console.warn("Video play failed:", e));

    // --- Swap glowstick colors ---
    // crowdFront and crowdBack alternate arm/glowstick objects (odd indices = glowsticks)
    for (let i = 1; i < crowdFront.length; i += 2) {
        crowdFront[i].r = v.glow.r;
        crowdFront[i].g = v.glow.g;
        crowdFront[i].b = v.glow.b;
    }
    for (let i = 1; i < crowdBack.length; i += 2) {
        crowdBack[i].r = v.glow.r;
        crowdBack[i].g = v.glow.g;
        crowdBack[i].b = v.glow.b;
    }

    // --- Update BPM ---
    songBPM = v.bpm;

    // --- Update the glow light color uniform for PhongWithGlow ---
    gl.uniform3f(window.uGlowLightColorLoc, v.glow.r, v.glow.g, v.glow.b);
}
// ---------------------------------------------------------------------------
// faceUV: converts a pixel rectangle in a texture atlas into the 12 UV values
// (6 vertices = 2 triangles) needed for one quad face of the cube.
//
// Parameters:
//   x, y       — top-left corner of the region in pixels
//   w, h       — width and height of the region in pixels
//   imgW, imgH — full texture image dimensions in pixels
//
// The winding order here matches the vertex winding in the points buffer:
//   Triangle 1: top-right, top-left, bottom-left   (vertices 0,1,2)
//   Triangle 2: bottom-left, bottom-right, top-right (vertices 3,4,5)
//
// WebGL UV origin (0,0) is bottom-left, so v0 (top of image) = y/imgH
// and v1 (bottom of image region) = (y+h)/imgH.
// ---------------------------------------------------------------------------
function faceUV(x, y, w, h, imgW, imgH, { flipU = false, flipV = false } = {}) {
    let u0 = x           / imgW;
    let u1 = (x + w)     / imgW;
    let v0 = y           / imgH;   // top of region in image space
    let v1 = (y + h)     / imgH;   // bottom of region in image space


    // Swap the relevant pair of coordinates to flip that axis
    if (flipU) { [u0, u1] = [u1, u0]; }
    if (flipV) { [v0, v1] = [v1, v0]; }


    // Two triangles, 6 UV pairs, matching vertex winding in the points buffer:
    //   Front face verts: (+x+y+z), (-x+y+z), (-x-y+z), (-x-y+z), (+x-y+z), (+x+y+z)
    //   Mapping:           top-left  top-rogjt  bot-right   bot-right  bot-left  top-left

    
    return [
        vec2(u0, v0),   // top-left
        vec2(u1, v0),   // top-right
        vec2(u1, v1),   // bottom-right
        vec2(u1, v1),   // bottom-right  (start of tri 2)
        vec2(u0, v1),   // bottom-left
        vec2(u0, v0),   // top-left
    ];
}



// ---------------------------------------------------------------------------
// buildCubeUVs: assembles all 36 UV pairs (6 faces × 6 vertices) for one cube.
//
// 'faces' is an array of 6 objects, one per face, in the order the faces
// appear in the vertex buffer: [front, back, left, right, top, bottom].
// Each object has { x, y, w, h } pixel coordinates in the texture atlas.
//
// imgW / imgH are the atlas image dimensions.
// ---------------------------------------------------------------------------
function buildCubeUVs(faces, imgW, imgH) {
    const uvs = [];
    for (const f of faces) {
        uvs.push(...faceUV(f.x, f.y, f.w, f.h, imgW, imgH,
                           { flipU: f.flipU, flipV: f.flipV }));
    }
    return uvs;
}
// ---------------------------------------------------------------------------

const IMG_W = 64, IMG_H = 64;
var figureLight = 0.9

// Each entry in the scene carries a 'uvs' Float32Array (36 UV pairs for
// a cube, 18 for a pyramid) that will be uploaded to the GPU before its draw.
const scene = [
    {   // HEAD
        shape: 'cube',
        tx: 0.0,  ty: cubeSize * 2.5,   tz: 0.0,
        lx: 0.0,  ly: 0.0,   lz: 0.0,
        rx: 0.0,  sx: 1,     sy: 1,    sz: 1,
        r: 1, g: 0, b: 0,
        emissive: figureLight,
        // Face UV regions [front, back, left, right, top, bottom]
        uvs: buildCubeUVs([
            { x:  24, y:  8, w: 8, h: 8 },  // back
            { x: 8, y:  8, w: 8, h: 8, flipU: true },  // front
            { x:  0, y:  8, w: 8, h: 8 },  // left
            { x: 16, y:  8, w: 8, h: 8 },  // right
            { x:  8, y:  0, w: 8, h: 8, flipV: true },  // top
            { x: 16, y:  0, w: 8, h: 8 },  // bottom
        ], IMG_W, IMG_H)
    },
    {   // BODY
        shape: 'cube',
        tx: 0.0,  ty: 0.0,   tz: 0.0,
        lx: 0.0,  ly: 0.0,   lz: 0.0,
        rx: 0.0,  sx: 1,     sy: 1.5,  sz: 0.625,
        r: 0, g: 1, b: 0,
        emissive: figureLight,
        uvs: buildCubeUVs([
            { x: 32, y: 20, w:  8, h: 12}, // back
            { x: 20, y: 20, w:  8, h: 12, flipU: true  }, // front
            { x: 16, y: 20, w:  4, h: 12 }, // left
            { x: 28, y: 20, w:  4, h: 12 }, // right
            { x: 20, y: 16, w:  8, h:  4 }, // top
            { x: 28, y: 16, w:  8, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
    {   // RIGHT ARM
        shape: 'cube',
        tx: cubeSize * 1.375,  ty: 0.0,  tz: 0.0,
        lx: 0.0,    ly: 0.0,  lz: 0.0,
        rx: 0.0,    sx: 0.375, sy: 1.5, sz: 0.625,
        r: 0, g: 0, b: 1,
        emissive: figureLight,
        uvs: buildCubeUVs([
            { x: 43, y:  52, w: 3, h: 12}, // front
            { x: 36, y:  52, w: 3, h: 12, flipU:true}, // back
            { x: 32, y:  52, w: 4, h: 12 }, // left  
            { x: 39, y:  52, w: 4, h: 12 }, // right 
            { x: 36, y:  48, w: 3, h:  4 }, // top
            { x: 39, y:  48, w: 3, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
    {   // LEFT ARM
        shape: 'cube',
        tx: -cubeSize * 1.375, ty: 0.0,  tz: 0.0,
        lx: 0.0,    ly: 0.0,  lz: 0.0,
        rx: 0.0,    sx: 0.375, sy: 1.5, sz: 0.625,
        r: 0, g: 0, b: 1,
        emissive: figureLight,
        // Left arm uses the same regions as right arm in a basic skin;
        // swap left/right faces to mirror if your atlas has separate left-arm tiles
        uvs: buildCubeUVs([
            { x: 51, y:  20, w: 3, h: 12 }, // front
            { x: 44, y:  20, w: 3, h: 12, flipU: true }, // back
            { x: 40, y:  20, w: 4, h: 12 }, // left
            { x: 47, y:  20, w: 4, h: 12 }, // right
            { x: 44, y:  16, w: 3, h:  4 }, // top
            { x: 47, y:  16, w: 3, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
    {   // RIGHT LEG
        shape: 'cube',
        tx: cubeSize*0.5,  ty: -cubeSize*3,  tz: 0.0,
        lx: 0.0,  ly:  0.0,  lz: 0.0,
        rx: 0.0,  sx: 0.5,   sy: 1.5,  sz: 0.625,
        r: 1, g: 1, b: 0,
        emissive: figureLight,
        uvs: buildCubeUVs([
            { x:  28, y:  52, w: 4, h: 12 }, // back
            { x: 20, y:  52, w: 4, h: 12,flipU: true }, // front
            { x:  16, y:  52, w: 4, h: 12 }, // left
            { x:  24, y:  52, w: 4, h: 12 }, // right
            { x:  20, y:  48, w: 4, h:  4 }, // top
            { x:  24, y:  48, w: 4, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
    {   // LEFT LEG
        shape: 'cube',
        tx: -cubeSize*0.5, ty: -cubeSize*3,  tz: 0.0,
        lx:  0.0, ly:  0.0,  lz: 0.0,
        rx:  0.0, sx:  0.5,  sy: 1.5,  sz: 0.625,
        r: 1, g: 0, b: 1,
        emissive: figureLight,
        // Mirror left/right faces for left leg
        uvs: buildCubeUVs([
            { x:  12, y:  20, w: 4, h: 12 }, // back
            { x: 4, y:  20, w: 4, h: 12, flipU: true }, // front
            { x:  0, y:  20, w: 4, h: 12 }, // left  (swapped)
            { x:  8, y:  20, w: 4, h: 12 }, // right (swapped)
            { x:  4, y:  16, w: 4, h:  4 }, // top
            { x:  8, y:  16, w: 4, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
    {   // HEAD OVERLAY
    shape: 'cube',
    tx: 0.0,  ty: cubeSize * 2.5,  tz: 0.0,
    lx: 0.0,  ly: 0.0,  lz: 0.0,
    rx: 0.0,
    // Scale 5% larger on each axis so it wraps just outside the head
    sx: 1.1,  sy: 1.1,  sz: 1.1,
    r: 1, g: 0, b: 0,
    emissive: figureLight,
    overlay: true,   // <-- drawn in pass 2
    uvs: buildCubeUVs([
        { x: 56, y:  8, w: 8, h: 8  },              // back
        { x: 40, y:  8, w: 8, h: 8,flipU: true },   // front
        { x: 32, y:  8, w: 8, h: 8 },               // left
        { x: 48, y:  8, w: 8, h: 8 },               // right
        { x: 40, y:  0, w: 8, h: 8, flipV: true },  // top
        { x: 48, y:  0, w: 8, h: 8},                // bottom
    ], IMG_W, IMG_H)
},
{   // BODY OVERLAY
        shape: 'cube',
        tx: 0.0,  ty: 0.0,   tz: 0.0,
        lx: 0.0,  ly: 0.0,   lz: 0.0,
        rx: 0.0,  sx: 1.1,  sy: 1.65,  sz: 0.688,
        r: 0, g: 1, b: 0,
        emissive: figureLight,
        overlay: true, 
        uvs: buildCubeUVs([
            { x: 32, y: 36, w:  8, h: 12}, // back
            { x: 20, y: 36, w:  8, h: 12, flipU: true  }, // front
            { x: 16, y: 36, w:  4, h: 12 }, // left
            { x: 28, y: 36, w:  4, h: 12 }, // right
            { x: 20, y: 32, w:  8, h:  4 }, // top
            { x: 28, y: 32, w:  8, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
{   // RIGHT ARM OVERLAY
        shape: 'cube',
        tx: cubeSize * 1.375,  ty: 0.0,  tz: 0.0,
        lx: 0.0,    ly: 0.0,  lz: 0.0,
        rx: 0.0,    sx: 0.412, sy: 1.65, sz: 0.688,
        r: 0, g: 0, b: 1,
        emissive: figureLight,
        overlay: true,
        uvs: buildCubeUVs([
            { x: 59, y:  52, w: 3, h: 12, }, // back
            { x: 52, y:  52, w: 3, h: 12, flipU: true}, // front
            { x: 46, y:  52, w: 4, h: 12 }, // left  
            { x: 55, y:  52, w: 4, h: 12 }, // right 
            { x: 50, y:  48, w: 3, h:  4 }, // top
            { x: 54, y:  48, w: 3, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
    {   // LEFT ARM OVERLAY
        shape: 'cube',
        tx: -cubeSize * 1.375, ty: 0.0,  tz: 0.0,
        lx: 0.0,    ly: 0.0,  lz: 0.0,
        rx: 0.0,    sx: 0.412, sy: 1.65, sz: 0.688,
        r: 0, g: 0, b: 1,
        emissive: figureLight,
        overlay: true,
        // Left arm uses the same regions as right arm in a basic skin;
        // swap left/right faces to mirror if your atlas has separate left-arm tiles
        uvs: buildCubeUVs([
            { x: 51, y:  36, w: 3, h: 12,  }, // back
            { x: 44, y:  36, w: 3, h: 12, flipU: true }, // front
            { x: 40, y:  36, w: 4, h: 12 }, // left
            { x: 47, y:  36, w: 4, h: 12 }, // right
            { x: 44, y:  32, w: 3, h:  4 }, // top
            { x: 47, y:  32, w: 3, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
    {   // RIGHT LEG OVERLAY
        shape: 'cube',
        tx: cubeSize*0.5,  ty: -cubeSize*3,  tz: 0.0,
        lx: 0.0,  ly:  0.0,  lz: 0.0,
        rx: 0.0,  sx: 0.55,   sy: 1.65,  sz: 0.688,
        r: 1, g: 1, b: 0,
        emissive: figureLight,
        overlay: true,
        uvs: buildCubeUVs([
            { x:  12, y:  52, w: 4, h: 12 }, // back
            { x: 4, y:  52, w: 4, h: 12,flipU: true }, // front
            { x:  0, y:  52, w: 4, h: 12 }, // left
            { x:  8, y:  52, w: 4, h: 12 }, // right
            { x:  4, y:  48, w: 4, h:  4 }, // top
            { x:  8, y:  48, w: 4, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },
     {   // LEFT LEG OVERLAY
        shape: 'cube',
        tx: -cubeSize*0.5, ty: -cubeSize*3,  tz: 0.0,
        lx:  0.0, ly:  0.0,  lz: 0.0,
        rx: 0.0,  sx: 0.55,   sy: 1.65,  sz: 0.688,
        r: 1, g: 0, b: 1, 
        emissive: figureLight,
        overlay: true,
        // Mirror left/right faces for left leg
        uvs: buildCubeUVs([
            { x:  12, y:  36, w: 4, h: 12 }, // back
            { x: 4, y:  36, w: 4, h: 12, flipU: true }, // front
            { x:  0, y:  36, w: 4, h: 12 }, // left  (swapped)
            { x:  8, y:  36, w: 4, h: 12 }, // right (swapped)
            { x:  4, y:  32, w: 4, h:  4 }, // top
            { x:  8, y:  32, w: 4, h:  4 }, // bottom
        ], IMG_W, IMG_H)
    },

];

const stage = [
    {   // Stage Base
        shape: 'cube',
        tx: 0.0,  ty: -0.75,   tz: 0.5,
        lx: 0.0,  ly: 0.0,   lz: 0.0,
        rx: 0.0,  sx: 10,     sy: 1.25,    sz: 3,
        r: 69/255, g: 71/255, b: 74/255,
        emissive: 0.15,
    },
    { //Stage Screen (Ring)
         shape: 'cube',
        tx: 0.0,  ty: 0,   tz: 0.75,
        lx: 0.0,  ly: 0.0,   lz: 0.0,
        rx: 0.0,  sx: 9,     sy: 5.5,    sz: 0.5,
        r: 69/255, g: 71/255, b: 74/255,
        emissive: 0.15,
    },
    { //Stage Screen (LED)
        shape: 'cube',
        tx: 0.0,  ty: 0.0,   tz: 0.73,
        lx: 0.0,  ly: 0.0,   lz: 0.0,
        rx: 0.0,  sx: 8,     sy: 4.5,    sz: 0.5,
        r: 1, g: 0, b: 0,
        useVideo: true, 
        emissive: 1.0, 
          // <-- signals drawObject to swap textures
        // Give it UVs covering the whole texture so the full video frame maps on
        uvs: buildCubeUVs([
            { x: 0, y: 0, w: 64, h: 64 },  // front  — full frame
            { x: 0, y: 0, w: 64, h: 64,  flipU: true },  // back
            { x: 0, y: 0, w: 64, h: 64 },  // left
            { x: 0, y: 0, w: 64, h: 64 },  // right
            { x: 0, y: 0, w: 64, h: 64 },  // top
            { x: 0, y: 0, w: 64, h: 64 },  // bottom
        ], 64, 64),
    },

];

const crowdFront = [];
for (let i = 0; i < 6; i++){
    x = -0.7 + i * 0.3;
    const pivotY = -0.95;   // shared pivot point in world space
    const pivotZ = -0.4;
    crowdFront.push(
        {//Arm
            shape: 'cube',
            tx: x,   ty: pivotY,   tz: pivotZ,
            lx: 0.0, ly: 0,  lz: 0.0,
            rx: 0.0, sx: 0.75, sy: 1.5, sz: 0.75,
            r: 0.4, g: 0.4, b: 0.4,
        },
        {//Glowstick
            shape: 'cube',
            tx: x,   ty: pivotY,  tz: pivotZ,
            lx: 0.0, ly: 0.25,  lz: 0.0,
            rx: 0.0, sx: 0.5, sy:3, sz: 0.5,
            r: 0.0, g: 0.9, b: 0.8,
            emissive: 1.0,
        }
    )
}
const crowdBack = [];
for (let i = 0; i < 6; i++) {
    x = -0.6 + i * 0.3;
    const pivotY = -0.95;   // shared pivot point in world space
    const pivotZ = -0.8;
    crowdBack.push(
        { //Arm
            shape: 'cube',
            tx: x,   ty: pivotY,   tz: pivotZ,
            lx: 0.0, ly: 0.0,  lz: 0.0,
            rx: 0.0, sx: 0.75, sy: 1.5, sz: 0.75,
            r: 0.75, g: 0.75, b: 0.75,
        },
        { //Glowstick
            shape: 'cube',
            tx: x,   ty: pivotY,  tz: pivotZ,
            lx: 0.0, ly: 0.25,  lz: 0.0,
            rx: 0.0, sx: 0.5, sy: 3, sz: 0.5,
            r: 0.0, g: 0.9, b: 0.8,
            emissive: 1.0,
        }
    );
}


// ---------------------------------------------------------------------------
// loadTexture: creates a WebGL texture from a URL.
//
// Immediately fills it with a 1×1 red placeholder so the render loop can
// start drawing before the image file has finished loading from disk.
// Once the Image object fires onload, the real pixel data replaces the
// placeholder and a mipmap chain is generated for minification filtering.
// ---------------------------------------------------------------------------
function loadTexture(gl, url) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);

    // Placeholder: 1×1 red pixel keeps the GPU happy while the file loads.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
                  gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));

    const img = new Image();
    img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        // Upload the actual image; no explicit width/height — WebGL infers them.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        // Build mipmaps so the texture looks correct when scaled down.
        //gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    };
    img.src = url;
    return tex;
}

// ---------------------------------------------------------------------------
// Global handles needed by render() — declared here so both init() and
// render() can access them without passing parameters.
// ---------------------------------------------------------------------------
var gl;
var canvas;
var program;
var texcoordBuffer;          // the one UV buffer we re-upload each draw call
var texcoordAttributeLocation;
var uUseTextureLoc;
var uLedModeLoc;
var texture;
var videoTex;
var videoEl;

window.onload = function init() {
    canvas  = document.getElementById("gl-canvas");
    gl      = canvas.getContext('webgl2');
    if (!gl) { alert("WebGL 2.0 isn't available"); }

    document.getElementById("VocaloidNext").onclick = () => {
        const next = (currentVocaloid + 1) % VOCALOIDS.length;
        switchVocaloid(next);
        document.getElementById("VocaloidName").textContent = VOCALOIDS[next].name;
    };
    document.getElementById("VocaloidPrev").onclick = () => {
        const prev = (currentVocaloid - 1 + VOCALOIDS.length) % VOCALOIDS.length;
        switchVocaloid(prev);
        document.getElementById("VocaloidName").textContent = VOCALOIDS[prev].name;
    };
    document.getElementById("CameraBtn").onclick = () => {
        currentCamera = (currentCamera + 1) % CAMERAS.length;
        targetCameraY = CAMERAS[currentCamera].angleY;
        targetCameraX = CAMERAS[currentCamera].angleX;
        document.getElementById("CameraName").textContent = CAMERAS[currentCamera].name;
    };

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // --- Normal buffer (one outward-facing normal per vertex) ---
    const normals = flatten([
        // CUBE normals (36 vertices, 6 faces × 6 verts)
        // Front  (+Z)
        vec3(0,0,1), vec3(0,0,1), vec3(0,0,1),
        vec3(0,0,1), vec3(0,0,1), vec3(0,0,1),
        // Back   (-Z)
        vec3(0,0,-1), vec3(0,0,-1), vec3(0,0,-1),
        vec3(0,0,-1), vec3(0,0,-1), vec3(0,0,-1),
        // Left   (-X)
        vec3(-1,0,0), vec3(-1,0,0), vec3(-1,0,0),
        vec3(-1,0,0), vec3(-1,0,0), vec3(-1,0,0),
        // Right  (+X)
        vec3(1,0,0), vec3(1,0,0), vec3(1,0,0),
        vec3(1,0,0), vec3(1,0,0), vec3(1,0,0),
        // Top    (+Y)
        vec3(0,1,0), vec3(0,1,0), vec3(0,1,0),
        vec3(0,1,0), vec3(0,1,0), vec3(0,1,0),
        // Bottom (-Y)
        vec3(0,-1,0), vec3(0,-1,0), vec3(0,-1,0),
        vec3(0,-1,0), vec3(0,-1,0), vec3(0,-1,0),

        // PYRAMID normals (18 vertices — approximate face normals)
        // Front tri
        vec3(0,0.447,0.894), vec3(0,0.447,0.894), vec3(0,0.447,0.894),
        // Left tri
        vec3(-0.894,0.447,0), vec3(-0.894,0.447,0), vec3(-0.894,0.447,0),
        // Right tri
        vec3(0.894,0.447,0), vec3(0.894,0.447,0), vec3(0.894,0.447,0),
        // Back tri
        vec3(0,0.447,-0.894), vec3(0,0.447,-0.894), vec3(0,0.447,-0.894),
        // Base tri 1
        vec3(0,-1,0), vec3(0,-1,0), vec3(0,-1,0),
        // Base tri 2
        vec3(0,-1,0), vec3(0,-1,0), vec3(0,-1,0),
    ]);

    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    var aNormal = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aNormal);

    // --- Vertex position buffer (unchanged geometry) ---
    var points = flatten([
        // --- CUBE (36 vertices) ---
        // Front face
         vec4( cubeSize,  cubeSize,  cubeSize, 1),
        vec4(-cubeSize,  cubeSize,  cubeSize, 1),
        vec4(-cubeSize, -cubeSize,  cubeSize, 1),
        vec4(-cubeSize, -cubeSize,  cubeSize, 1),
        vec4( cubeSize, -cubeSize,  cubeSize, 1),
        vec4( cubeSize,  cubeSize,  cubeSize, 1),
        // Back face
        vec4( cubeSize,  cubeSize, -cubeSize, 1),
        vec4(-cubeSize,  cubeSize, -cubeSize, 1),
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),
        vec4( cubeSize, -cubeSize, -cubeSize, 1),
        vec4( cubeSize,  cubeSize, -cubeSize, 1),
        // Left face  (-x side, so "right" in UV space = +z, "left" = -z)
        vec4(-cubeSize,  cubeSize,  cubeSize, 1),   // top-front    → top-right of face
        vec4(-cubeSize,  cubeSize, -cubeSize, 1),   // top-back     → top-left
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),   // bottom-back  → bottom-left
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),   // bottom-back  → bottom-left  (tri 2)
        vec4(-cubeSize, -cubeSize,  cubeSize, 1),   // bottom-front → bottom-right
        vec4(-cubeSize,  cubeSize,  cubeSize, 1),   // top-front    → top-right

        // Right face (+x side)
        vec4(cubeSize,  cubeSize, -cubeSize, 1),   // top-back     → top-right of face
        vec4(cubeSize,  cubeSize,  cubeSize, 1),   // top-front    → top-left
        vec4(cubeSize, -cubeSize,  cubeSize, 1),   // bottom-front → bottom-left
        vec4(cubeSize, -cubeSize,  cubeSize, 1),   // bottom-front → bottom-left  (tri 2)
        vec4(cubeSize, -cubeSize, -cubeSize, 1),   // bottom-back  → bottom-right
        vec4(cubeSize,  cubeSize, -cubeSize, 1),   // top-back     → top-right

        // Top face (+y side, "right" in UV space = +x, "down" = -z)
        vec4(-cubeSize,  cubeSize, -cubeSize, 1),   // back-left    → top-left
        vec4( cubeSize,  cubeSize, -cubeSize, 1),   // back-right   → top-right
        vec4( cubeSize,  cubeSize,  cubeSize, 1),   // front-right  → bottom-right
        vec4( cubeSize,  cubeSize,  cubeSize, 1),   // front-right  → bottom-right (tri 2)
        vec4(-cubeSize,  cubeSize,  cubeSize, 1),   // front-left   → bottom-left
        vec4(-cubeSize,  cubeSize, -cubeSize, 1),   // back-left    → top-left

        // Bottom face (-y side)
        vec4(-cubeSize, -cubeSize,  cubeSize, 1),   // front-left   → top-left
        vec4( cubeSize, -cubeSize,  cubeSize, 1),   // front-right  → top-right
        vec4( cubeSize, -cubeSize, -cubeSize, 1),   // back-right   → bottom-right
        vec4( cubeSize, -cubeSize, -cubeSize, 1),   // back-right   → bottom-right (tri 2)
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),   // back-left    → bottom-left
        vec4(-cubeSize, -cubeSize,  cubeSize, 1),   // front-left   → top-left

        // --- PYRAMID (18 vertices) ---
        // Front triangle
        vec4( 0.0,  cubeSize,  0.0,      1),
        vec4(-cubeSize, -cubeSize,  cubeSize, 1),
        vec4( cubeSize, -cubeSize,  cubeSize, 1),
        // Left triangle
        vec4( 0.0,  cubeSize,  0.0,      1),
        vec4(-cubeSize, -cubeSize,  cubeSize, 1),
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),
        // Right triangle
        vec4( 0.0,  cubeSize,  0.0,      1),
        vec4( cubeSize, -cubeSize,  cubeSize, 1),
        vec4( cubeSize, -cubeSize, -cubeSize, 1),
        // Back triangle
        vec4( 0.0,  cubeSize,  0.0,      1),
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),
        vec4( cubeSize, -cubeSize, -cubeSize, 1),
        // Base triangle 1
        vec4( cubeSize, -cubeSize,  cubeSize, 1),
        vec4(-cubeSize, -cubeSize,  cubeSize, 1),
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),
        // Base triangle 2
        vec4( cubeSize, -cubeSize, -cubeSize, 1),
        vec4(-cubeSize, -cubeSize, -cubeSize, 1),
        vec4( cubeSize, -cubeSize,  cubeSize, 1),
    ]);

    var pointsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false,
                           4 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    // --- UV / texcoord buffer ---
    // We create the buffer once here but intentionally leave it empty.
    // render() will call gl.bufferData on it before each drawArrays call
    // to supply the per-object UV layout.
    texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

    // Get the attribute location so render() can re-enable it after switching
    // ARRAY_BUFFER targets.
    texcoordAttributeLocation = gl.getAttribLocation(program, "aTexCoord0");
    gl.enableVertexAttribArray(texcoordAttributeLocation);

    // Describe the buffer layout: 2 floats per vertex, tightly packed.
    // normalize=false because our data is already in [0,1] float range —
    // normalize=true is only meaningful for integer types like UNSIGNED_BYTE.
    gl.vertexAttribPointer(texcoordAttributeLocation,
        2,          // 2 components (s, t) — NOT 3
        gl.FLOAT,
        false,      // normalize=false: UVs are already floats in [0,1]
        0,          // stride=0: tightly packed
        0);         // offset=0: start at byte 0

    // --- Uniform locations ---
    uUseTextureLoc = gl.getUniformLocation(program, "uUseTexture");
    uAngleZLoc = gl.getUniformLocation(program, "uAngleZ");
    uAngleXLoc = gl.getUniformLocation(program, "uAngleX");
    uAngleYLoc = gl.getUniformLocation(program, "uAngleY");   
    uDeltaXLoc = gl.getUniformLocation(program, "uDeltaX");
    uDeltaYLoc = gl.getUniformLocation(program, "uDeltaY");
    uDeltaZLoc = gl.getUniformLocation(program, "uDeltaZ");
    uScaleXLoc = gl.getUniformLocation(program, "uScaleX");
    uScaleYLoc = gl.getUniformLocation(program, "uScaleY");
    uScaleZLoc = gl.getUniformLocation(program, "uScaleZ");
    uLocalXLoc = gl.getUniformLocation(program, "uLocalX");
    uLocalYLoc = gl.getUniformLocation(program, "uLocalY");
    uLocalZLoc = gl.getUniformLocation(program, "uLocalZ");
    uColorLoc  = gl.getUniformLocation(program, "uColor");
    uLedModeLoc = gl.getUniformLocation(program, "uLedMode");
    var uEmissiveLoc = gl.getUniformLocation(program, "uEmissive");
    window.uEmissiveLoc = uEmissiveLoc;  // make accessible to drawObject
    window.uGlowLightColorLoc = gl.getUniformLocation(program, "uGlowLightColor");
    // Set the initial color to match whichever vocaloid starts on screen (Miku by default)

    window.uCameraXLoc = gl.getUniformLocation(program, "uCameraX");
    window.uCameraYLoc = gl.getUniformLocation(program, "uCameraY");
    window.uCameraScaleLoc = gl.getUniformLocation(program, "uCameraScale");
    gl.uniform1f(window.uCameraScaleLoc, 0.8);
    // Set initial values
    gl.uniform1f(window.uCameraXLoc, 0.0);
    gl.uniform1f(window.uCameraYLoc, 0.0);
    const v0 = VOCALOIDS[currentVocaloid];
    gl.uniform3f(window.uGlowLightColorLoc, v0.glow.r, v0.glow.g, v0.glow.b);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // --- Texture setup (done ONCE here, not per frame) ---
    
    
    const uTextureLoc = gl.getUniformLocation(program, "u_texture");
    // Activate texture unit 0 and bind our texture to it.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Tell the sampler uniform which texture unit to read from (unit 0).
    gl.uniform1i(uTextureLoc, 0);

    // --- Video texture setup ---
    videoEl = document.getElementById("led-video");
    videoTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, videoTex);

    // Fill with a black placeholder until the video is ready
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
                gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

    // No mipmaps for video — dimensions change and NEAREST keeps it sharp
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // CLAMP prevents edge-bleeding when UVs hit exactly 0 or 1
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Make videoTex and videoEl accessible to render()
    window.videoTex = videoTex;
    window.videoEl  = videoEl;

    //Set vocaloid and video
    texture = loadTexture(gl, VOCALOIDS[currentVocaloid].skin);
    window.texture = texture;  
    songBPM = VOCALOIDS[currentVocaloid].bpm;
    videoEl.src = VOCALOIDS[currentVocaloid].video;

    // Browsers block autoplay until user interaction.
    // Start the video on the first click or keypress anywhere on the page.
    const startVideo = () => {
        videoEl.play().catch(e => console.warn("Video play failed:", e));
        // Remove listeners after first trigger — only need to start it once
        window.removeEventListener('click',   startVideo);
        window.removeEventListener('keydown', startVideo);
    };
    window.addEventListener('click',   startVideo);
    window.addEventListener('keydown', startVideo);

    
    for (const obj of scene){
        obj.ty -= 0.175;
        obj.tz -= -0.4
    }
    for (const obj of scene) {
        obj.baseTy = obj.ty;
    }

    
    render();
};

// ---------------------------------------------------------------------------
// drawObject: uploads this object's UVs and issues the draw call.
// Called by both passes in render().
// ---------------------------------------------------------------------------
function drawObject(obj) {
    // --- Handle objects with no UV data (flat-color stage pieces) ---
    if (obj.uvs) {
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(obj.uvs), gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(texcoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    }

     if (obj.useVideo) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, window.videoTex);
    }

    // let angleX = 0.0;
    // if (obj.armAngle === 'right') angleX = sArmRightAngle;
    // if (obj.armAngle === 'left')  angleX = sArmLeftAngle;

    // Guard against missing rx — default to 0 if not set
    gl.uniform1f(uAngleZLoc, (obj.crowdAngle ?? 0.0) + (obj.rx ?? 0.0));
    gl.uniform1f(uAngleXLoc, 0.0);
    gl.uniform1f(uAngleYLoc, obj.figureTwist ?? 0.0);  // driven by camera
    gl.uniform1f(uDeltaXLoc, obj.tx);
    gl.uniform1f(uDeltaYLoc, obj.ty);
    gl.uniform1f(uDeltaZLoc, obj.tz);
    gl.uniform1f(uScaleXLoc, obj.sx);
    gl.uniform1f(uScaleYLoc, obj.sy);
    gl.uniform1f(uScaleZLoc, obj.sz);
    gl.uniform1f(uLocalXLoc, obj.lx ?? 0.0);
    gl.uniform1f(uLocalYLoc, obj.ly ?? 0.0);
    gl.uniform1f(uLocalZLoc, obj.lz ?? 0.0);
    gl.uniform4f(uColorLoc,  obj.r, obj.g, obj.b, 1.0);
    gl.uniform1f(uUseTextureLoc, obj.uvs ? 1.0 : 0.0);
    gl.uniform1f(uLedModeLoc, obj.useVideo ? 1.0 : 0.0);
    gl.uniform1f(window.uEmissiveLoc, obj.emissive ?? 0.0);

    if (obj.shape === 'cube') {
        gl.drawArrays(gl.TRIANGLES, CUBE_FIRST, CUBE_COUNT);
    } else {
        gl.drawArrays(gl.TRIANGLES, PYRAMID_FIRST, PYRAMID_COUNT);
    }
    if (obj.useVideo) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, window.texture);
    }
}

function render(timestamp) {
    cameraAngleY += (targetCameraY - cameraAngleY) * CAMERA_LERP;
    cameraAngleX += (targetCameraX - cameraAngleX) * CAMERA_LERP;
    
    gl.uniform1f(window.uCameraXLoc, cameraAngleX);
    gl.uniform1f(window.uCameraYLoc, cameraAngleY);

    if (!timestamp) {
        requestAnimationFrame(render);
        return;
    }
     // --- Glowstick animation ---
    const dt = (timestamp - lastTimestamp) / 1000.0;  // seconds since last frame
    lastTimestamp = timestamp;
    animTimer += dt;

    // One full back-and-forth per beat
    const beatsPerSecond = songBPM / 60.0;

    const angleRad = SWING_DEGREES * Math.sin(animTimer * beatsPerSecond * Math.PI) * (Math.PI / 180.0);
    const jumpVal = (Math.sin(animTimer * beatsPerSecond * Math.PI) + 1.0) / 2.0;
    const JUMP_HEIGHT = 0.15;  // tune this — world units
    // Twist: runs at half the beat rate, swings ±45°
    const TWIST_DEGREES = 45.0;
    const twistRad = TWIST_DEGREES * Math.sin(animTimer * beatsPerSecond * Math.PI * 0.5) * (Math.PI / 180.0) * 0.25;
    for (const obj of crowdFront) {
        obj.crowdAngle = angleRad;
    }
    for (const obj of crowdBack) {
        obj.crowdAngle = -angleRad;
    }
    for (const obj of scene) {
        obj.ty = obj.baseTy + jumpVal * JUMP_HEIGHT;
        obj.figureTwist = twistRad;
    }

    // Upload the current video frame to the GPU if the video is playing.
    // HAVE_ENOUGH_DATA (value 4) means there are pixels available to read.
    if (videoEl.readyState >= videoEl.HAVE_ENOUGH_DATA) {
        gl.bindTexture(gl.TEXTURE_2D, videoTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                    gl.UNSIGNED_BYTE, videoEl);
        // Rebind skin texture to unit 0 so the figure still renders correctly
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);  // 'texture' = your skin
    }
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Pass 1: all figure base layers
    for (const obj of scene) {
        if (!obj.overlay) drawObject(obj);
    }
    // Pass 2: all transparent overlay layers
    // depthMask(false) means overlays still depth-TEST (so they hide behind
    // other parts correctly) but don't depth-WRITE (so they don't block
    // each other's transparent pixels)
    gl.depthMask(false);
    for (const obj of scene) {
        if (obj.overlay) drawObject(obj);
    }
    gl.depthMask(true);
    // Pass 3: Draw stage
    for (const obj of stage){
        drawObject(obj);
    }
    // Pass 4: Draw front row glowsticks
    for (const obj of crowdFront) {
        drawObject(obj);
    }
    // Pass 5: Draw back row glowsticks
    for (const obj of crowdBack) {
        drawObject(obj);
    }

    requestAnimationFrame(render);
}
