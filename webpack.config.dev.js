const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv =  require('dotenv-webpack');

module.exports = {
    entry: './src/index.js', //PUNTO DE ENTRADA DE NUESTRA APLICACIÓN
    output: { //PUNTO DE SALIDA DE LA APLICACION ->POR DEFECTO LA CARPETA dist
        path: path.resolve(__dirname, 'dist'), //PATH DEL DIRECTORIO
        filename: '[name].[contenthash].js', //NOMBRE DE ARCHIVO DE SALIDA
        assetModuleFilename: "assets/images/[hash][ext]",//PARAMETRIZAR LA CARPETA DE SALIDA DE LOS ASSETS
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],//EXTENSIONES QUE RESUELVE Y TRATA WEBPACK EN ESTE PROYECTO
        alias:{
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@template': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
        }
    },
    module: {
        rules: [
            {
                // Propiedad que identifica cuáles archivos deberán ser transformados
                test: /\.m?js$/ ,
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_modules/ , 
                // Propiedad que identifica el loader que será usado para transformar a dichos archivos 
                use: {  
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,  // REGLA PARA ACEPTAR IMAGENES .PNG
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2)$/, // REGLA PARA ARCHIVOS WOFF | WOFF2
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // Habilita o deshabilita la transformación de archivos en base64
                        mimetype: 'aplication/font-woff',   // Especifica el tipo MIME con el que se alineará el archivo. 
                                                            // Los MIME Types (Multipurpose Internet Mail Extensions)
                                                            // son la manera standard de mandar contenido a través de la red.
                        name:"[name].[contenthash].[ext]",// EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN   
                        outputPath: './assets/fonts/', // EL DIRECTORIO DE SALIDA   
                        publicPath: '../assets/fonts/',  // EL DIRECTORIO PUBLICO
                        esModule: false   // AVISAR EXPLICITAMENTE SI ES UN MODULO
                    }
                }
            }
        ]   
    },
    //SECCION DE PLUGINS
    plugins:[
        //CONFIGURACION HTML PLUGIN
        new HtmlWebpackPlugin({
            //INYECTA EL BUNDLE EN EL TEMPLATE HTML
            inject: true,
            //LA RUTA DEL TEMPLATE HTML
            template: './public/index.html',
            //NOMBRE FINAL DEL ARCHIVO
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns : [
                { 
                    //DESDE DONDE SE VA A MOVER TODO EL ARCHIVO O CARPETA
                    from: path.resolve(__dirname, "src", "assets/images"),
                    //DESTINO DEL ARCHIVO O CARPETA
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
}