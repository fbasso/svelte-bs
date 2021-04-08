const sass = require('sass');

module.exports = {
    preprocess: {
        style: function({ content, attributes }) {
            if (attributes.type !== 'text/scss') {
                return;
            }

            const result = sass.renderSync({
                data: content,
                sourceMap: 'style.css.map',
                omitSourceMapUrl: true,
            });

            return {
                code: result.css.toString('utf8'),
                map: result.map.toString('utf8'),
            };
        },
    },
};
