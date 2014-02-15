var express = require('express'),
    app     = express(),
    mysql   = require('mysql'); // And mysql module you've just installed.

// Create the connection.
// Data is default to new mysql installation and should be changed according to your configuration.
var connection = mysql.createConnection({
	host:     '50.62.147.52',
	user:     'sexymdb',
	password: 'Px3YMDW3',
	database: 'sexymdb'
});

app.get('/', function(req, res) {
	var word = req.query.word;
	
//	connection.connect();
	connection.query('SELECT * FROM sm_posts p, sm_postmeta m WHERE p.ID = m.post_id AND p.post_name = ' + connection.escape(word) + ' AND m.meta_key = "sentences" LIMIT 1', function(err, rows, fields) {
		if (err) throw err;
		generatePDF(word, rows[0].meta_value);
	});
//	connection.end();

	res.end();
});

app.listen(3000); 

function generatePDF(word, data) {
	var PDFDocument  = require('pdfkit'),
	    arrayOfLines = data.match(/[^\r\n]+/g), // Split by line
	    sentences    = [];

	doc = new PDFDocument({size: 'A4'});
	doc.registerFont('Simhei', 'simhei.ttf');
	doc.image('template.jpg', 0, 0, {width: 595.28, height: 841.89}); // Add background A4
	
	// Explode text in a multi-dimensional array
	for (l in arrayOfLines) {
		var arrayOfSentences = arrayOfLines[l].split('|');
		sentences[l] = [];
		for (s in arrayOfSentences) {
			sentences[l][s] = arrayOfSentences[s];
		}
	}

	// Main character: english
	doc.font('Helvetica').fontSize(30).fill('#221714').text(sentences[0][2], 20, 150, {
		width: 265,
		align: 'center'
	});
	// Main character: chinese
	doc.font('Simhei').fontSize(150).fill('#221714').text(sentences[0][1], 75, 200);
	// Main character: pinyin
	doc.font('Simhei').fontSize(30).fill('#9f9fa0').text(sentences[0][0], 25, 370, {
		width: 265,
		align: 'center'
	});

	// 2 Boxes
	for (i = 1; i <= 2; i++) {
		doc.font('Simhei').fontSize(40).fill('#c30d22').text(sentences[i][1], 320, i * 135 + (i - 1) * 30, {
			width: 265,
			align: 'left'
		})
		.moveDown(0.1)
		.fontSize(15).fill('#9f9fa0').text(sentences[i][0])
		.moveDown(0.5)
		.font('Helvetica').fontSize(20).fill('#221714').text(sentences[i][2]);
	}

	// 3 Sentences
	var left = 20;
	var space = 87;
	for (i = 1; i <= 3; i++) {
		doc.font('Simhei').fontSize(30).fill('#c30d22').text(sentences[i + 2][1], left, (i + 5) * space)
		   .fontSize(15).fill('#9f9fa0').text(sentences[i + 2][0], left, (i + 5) * space + 30)
		   .font('Helvetica').fontSize(15).fill('#221714').text(sentences[i + 2][2], left, (i + 5) * space + 50)
	}

	var pathpdf = 'v2/wp-content/media/dl/dailyvocab/' + word + '.pdf',
	    pdffile = '../../sexymandarin/www/' + pathpdf;
	
	doc.write(pdffile);
	
	// Upload the PDF File
	
	var Client = require('ftp');
	var c = new Client();
	
	c.on('ready', function() {
		c.put(pdffile,pathpdf, function(err) {
			if (err) throw err;
			c.end();
		});
	});
	c.connect({
		host: '50.62.147.52',
		user: 'sexymandarin',
		password: 'XWeWcF9j'
	});
}