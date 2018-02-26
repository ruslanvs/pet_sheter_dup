let express = require( "express");
let app = express();

let bodyParser = require( "body-parser" );
let path = require( "path" );
let mongoose = require( "mongoose" );

let uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.use( express.static( __dirname + "/client/dist" ) );

mongoose.connect( "mongodb://localhost/pet_shelter_dup" );

let Schema = mongoose.Schema;

let minlength = 3
let maxlength = 50

let constraints = {
    minlength: minlength,
    maxlength: maxlength,

    str_r_u: {
        type: String,
        minlength: [minlength, "{PATH} should have at least {MINLENGTH} characters"],
        maxlength: [maxlength, "{PATH} should have no more than {MAXLENGTH} characters"],
        validate: {
            validator: function( str ) {
                return /^[a-zA-Z]+$/.test( str );
            },
            message: "What were you thinking?! {VALUE} is not a valid name, it must only have letters!"
        },
        // validate:
        // [
        //     {
        //         validator: function( str ) {
        //             return /^[a-zA-Z]+$/.test( str );
        //         },
        //         message: "What were you thinking?! {VALUE} is not a valid name, it must only have letters!"
        //     },

        //     {
        //         validator: function( str ) {
        //             return /^[0-9]+$/.test( str );
        //         },
        //         message: "What were you thinking?! {VALUE} is not a valid name, it must only have numbers!"
        //     },
        // ],
        required: true,
        unique: true,
    },

    str_r: {
        type: String,
        minlength: minlength,
        maxlength: maxlength,
        required: true,
    },

    str: {
        type: String,
        minlength: minlength,
        maxlength: maxlength,
    },

    like: {
        type: Number,
    },
}

let PetSchema = new mongoose.Schema( {
    name: constraints.str_r_u,
    type: constraints.str_r,
    desc: constraints.str_r,
    like: constraints.like,
    image_url: String,
    skill1: constraints.str,
    skill2: constraints.str,
    skill3: constraints.str,
    wiz: Array,
}, { timestamps: true } );

PetSchema.plugin( uniqueValidator, { message: '{PATH} {VALUE} is already registered in the shelter, please use a unique one'} );

let Pet = mongoose.model( "Pet", PetSchema );

app.get( "/constraints", function( req, res ){
    res.json( constraints );
})

app.get( "/pets", function( req, res ){
    Pet.find( {}, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
    .sort( "type" );
})

app.get( "/pets/:id", function( req, res ){
    Pet.find( { _id: req.params.id }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.post( "/pets", function( req, res ){
    let pet = new Pet( req.body );
    pet.save( function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.put( "/pets/:id", function( req, res ){
    Pet.update( { _id: req.params.id },{
        name: req.body.name,
        type: req.body.type,
        desc: req.body.desc,
        image_url: req.body.image_url,
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3,
        wiz: req.body.wiz
    }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.get( "/pets/:id/like", function( req, res ){
    Pet.findOneAndUpdate( { _id: req.params.id }, {$inc: { like: 1 }}, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.delete( "/pets/:id", function( req, res ){
    Pet.remove( { _id: req.params.id }, function( err, data ){
        if( err ){ res.json( { message: "Error", error: err } ) }
        else{ res.json( { message: "Success", data: data } ) }
    })
})

app.all( "*", ( req, res, next ) => {
    res.sendFile( path.resolve( "./client/dist/index.html" ) );
});

app.listen( 8002, function(){
    console.log( "listening on port 8002" );
});