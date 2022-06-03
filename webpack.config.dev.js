// Prepararlo para que entienda el punto de entrada, hacia donde va a enviar la compilación y cuales van a ser las extensiones que va a usar.
const path = require("path");
//Añadir el recursos de webpack para leer html
const HtmlWebpackPlugin = require("html-webpack-plugin");
//Añadir el recurso de mini-css-extract-plugin para poder extraer los css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//Añadir el soporte para copy-webpack
const CopyWebpackPlugin = require("copy-webpack-plugin");
//Añadir el soporte para el paquete de env
const Dotenv = require("dotenv-webpack");


/** @type {import('webpack').Configuration} */

//Crear módulo que se va a exportar con un objeto con la configuración deseada.
module.exports = {
  //Definir el punto de entrada.
  entry: "./src/index.js",
  //Definir el punto de salida.
  output: {
    //Path donde se va a guardar el archivo compilado.
    path: path.resolve(__dirname, "dist"),
    //Nombre del archivo compilado.
    filename: "[name].[contenthash].js",
    //Hacia donde vamos a mover el archivo compilado.
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  mode: 'development',
  watch: true,
  //Con qué extensión se va a guardar el archivo compilado.
  resolve: {
    extensions: [".js", ".jsx"],
    //Vamos a crear un alias para que no tenga que escribir src/ en todas las importaciones.
    alias: {
      //Identificar los elementos que se van a importar.
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  //Añadir configuración de babel.
  module: {
    rules: [
      {
        //Test que nos permite saber que extensiones utilizar.
        // test: /\.(js|jsx)$/,
        //Utiliza cualquier extensión mjs, que es la de modulos o js
        test: /\.m?js$/,
        //Ahora, excluir los archivos que no queremos que sean compilados.
        exclude: /(node_modules|bower_components)/,
        //Añadir loader de babel.
        use: {
          loader: "babel-loader",
        },
      },
      //Nueva regla para el uso de css.
      {
        test: /\.css|\.styl$/i,
        use: [
          //Añadir loader de css.
          MiniCssExtractPlugin.loader,
          //Añadir loader de css.
          "css-loader",
          "stylus-loader",
        ],
      },
      //Nueva regla para el uso de imagenes.
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: './assets/images/[hash][ext][query]',
        },
      },
      //Nueva regla para el uso de archivos de fuentes.
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/fonts/[name][ext][query]",
        },
        // use: {
        //   loader: "url-loader",
        //   options: {
        //     limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
        //     // Habilita o deshabilita la transformación de archivos en base64.
        //     mimetype: "aplication/font-woff",
        //     // Especifica el tipo MIME con el que se alineará el archivo.
        //     // Los MIME Types (Multipurpose Internet Mail Extensions)
        //     // son la manera standard de mandar contenido a través de la red.
        //     name: "[name].[ext]",
        //     // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
        //     // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria
        //     // ubuntu-regularhola.woff
        //     outputPath: "./assets/fonts/",
        //     // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
        //     publicPath: "../assets/fonts/",
        //     // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
        //     esModule: false,
        //     // AVISAR EXPLICITAMENTE SI ES UN MODULO
        //   },
        // },
      },
    ],
  },
  //Sección de plugins.
  plugins: [
    //Crear un plugin para crear un archivo html.
    new HtmlWebpackPlugin({
      inject: true, //Para que haga la inserción de los elementos.
      //Template que vamos a utilizar.
      template: "./public/index.html",
      //Resultado de la preparación de html, transforma el template con los elementos que se le indicany lo ubica en la carpeta dist.
      filename: "./index.html",
    }),
    //Crear un plugin para extraer los css.
    new MiniCssExtractPlugin({
      //Nombre del archivo css.
      filename: "./assets/[name].[contenthash].css",
    }),
    //Crear un plugin para copiar los archivos.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    //Crear un plugin para crear un archivo de variables de entorno.
    new Dotenv(),
  ],

};
