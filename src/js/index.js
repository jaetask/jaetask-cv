'use strict';
/**
 * One problem at a time,
 * First up, convert this single page app into domchanger style components
 *
 * Thoughts:
 * ---------
 * - Each page is a unique application.
 * - Each page is a single self contained js file
 * - Each page can 'require' other components
 */

	/*
var minimalWebsite = {
	render: function(element, content) {
		element.innerHTML = content;
	}
};

minimalWebsite.render(document.getElementsByClassName('app')[0], marked(page.content));

var navHeader = require('./nav-header.js');
var navSidebar = require('./nav-sidebar.js');
*/

domChanger(FilterableProductTable, document.getElementsByClassName('app')[0]).update([
	{category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
	{category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
	{category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
	{category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
	{category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
	{category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]);

function FilterableProductTable(emit, refresh) {
	var filterText = '';
	var inStockOnly = false;
	return {
		render: render,
		on: { userInput: onUserInput }
	};
	function render(products) {
		return ["div",
			[SearchBar, filterText, inStockOnly],
			[ProductTable, products, filterText, inStockOnly]
		];
	}
	function onUserInput(text, checked) {
		filterText = text;
		inStockOnly = checked;
		refresh();
	}
}

function SearchBar(emit, refresh, refs) {
	return { render: render };
	function render(filterText, inStockOnly) {
		return ["form", { onsubmit: cancel },
			["input$filterText", {
				type: "text",
				placeholder: "Search...",
				onkeyup: handleChange,
				value: filterText
			}],
			["p",
				["input$inStockOnly", {
					type: "checkbox",
					onchange: handleChange,
					checked: !!inStockOnly
				}],
				"Only show products in stock"
			]
		];
	}
	function cancel(evt) {
		evt.preventDefault();
	}
	function handleChange() {
		emit("userInput",
			refs.filterText.value,
			refs.inStockOnly.checked
		);
	}
}

function ProductTable() {
	return { render: render };
	function render(products, filterText, inStockOnly) {
		var rows = [];
		var lastCategory = null;
		products.forEach(function(product) {
			if (product.name.indexOf(filterText) === -1 ||
				(!product.stocked && inStockOnly)) {
				return;
			}
			var item;
			if (product.category !== lastCategory) {
				item = [ProductCategoryRow, product.category];
				item.key = product.category;
				rows.push(item);
			}
			item = [ProductRow, product];
			item.key = product.name;
			rows.push(item);

			lastCategory = product.category;
		});

		return ["table",
			["thead",
				["tr",
					["th", "Name"],
					["th", "Price"]
				]
			],
			["tbody", rows]
		];
	}
}

function ProductCategoryRow() {
	return { render: render };
	function render(category) {
		return ["tr",
			["th", {colspan:2}, category]
		];
	}
}

function ProductRow() {
	return { render: render };
	function render(product) {
		var name = product.stocked ?
			product.name :
			["span", {style: {color: "red"}},
				product.name
			];
		return ["tr",
			["td", name],
			["td", product.price]
		];
	}
}
exports.name = "main";