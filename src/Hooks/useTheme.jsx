export const ChangeTheme = (validador, colorIndex) => {
    let colores = [
        'primary',
        'secondary',
        'white',
        'secondaryOpaco',
        'primaryInput',
        'black',
        'primaryText'
    ]

   const resultado =  validador ? colores[colorIndex]: ''

   return resultado
};
