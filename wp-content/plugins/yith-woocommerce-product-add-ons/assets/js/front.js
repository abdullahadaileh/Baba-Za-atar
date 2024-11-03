/**
 * Front JS
 */

jQuery( document ).ready(
	function ( $ ) {

		/**
		 * Init the colorpicker input
		 */
		initColorpicker = function() {
			// Customizable args for wpColorPicker function.
			var colorPicker_opt = {
				color: false, // If Iris is attached to an input element, it will first try to pick up its value attribute. Otherwise, you can supply a color of any type that Color.js supports. (Hex, rgb, and hsl are good bets.).
				mode: 'hsl', // Iris can sport a variety of looks. It supports hsl and â€˜hsvâ€™ modes depending on your needs.
				controls: {
					horiz: 's', // horizontal defaults to saturation.
					vert: 'l', // vertical defaults to lightness.
					strip: 'h' // right strip defaults to hue.
				},
				hide: true, // Hide colorpickers by default.
				target: false, // a DOM element / jQuery selector that the element will be appended within. Only used when called on an input.
				width: 180, // the width of the collection of UI elements.
				palettes: false, // show a palette of basic colors beneath the square.
				change: function(event, ui) {
					let pickerContainer    = $( this ).closest( '.wp-picker-container' );
					let pickerInputWrap    = pickerContainer.find( '.wp-picker-input-wrap' );
					let placeholderElement = pickerContainer.find( '.wp-picker-custom-placeholder' );
					let clearElement       = pickerContainer.find( '.wp-picker-default-custom' );
					let colorPickerShow    = pickerContainer.find( '.wp-color-picker' ).data( 'addon-colorpicker-show' );
					let defaultColor       = pickerContainer.find( '.wp-color-picker' ).data( 'default-color' );
					let colorPickerInput = pickerInputWrap.find( 'input.wp-color-picker' );
					let addonOpt = $(colorPickerInput[0]);


					// Placeholder option to hide or not the necessary elements.
					if ( 'placeholder' === colorPickerShow ) {
						if ( '' !== ui.color.toString() || 'undefined' !== ui.color.toString() ) {
							pickerInputWrap.find( '.wp-color-picker' ).show();
							placeholderElement.hide();
							clearElement.show();
							placeholderElement.css( 'line-height', '3.0' );
						}
					}

					clearElement.removeClass( 'default_color' );
					if ( defaultColor !== ui.color.toString() ) {
						clearElement.addClass( 'default_color' );
					}

					$( document ).trigger( 'wapo-colorpicker-change', addonOpt );

				},
				clear: function(event, ui) {

					let pickerContainer    = $( this ).closest( '.wp-picker-container' );
					let pickerInputWrap    = pickerContainer.find( '.wp-picker-input-wrap' );
					let placeholderElement = pickerContainer.find( '.wp-picker-custom-placeholder' );
					let clearElement       = pickerContainer.find( '.wp-picker-default-custom' );
					let colorPickerShow    = pickerContainer.find( '.wp-color-picker' ).data( 'addon-colorpicker-show' );
					let colorPickerInput   = pickerInputWrap.find( 'input.wp-color-picker' );
					let addonOpt = $(colorPickerInput[0]);

					// Placeholder option to hide or not the necessary elements.
					if ( 'placeholder' === colorPickerShow ) {
						pickerInputWrap.find( '.wp-color-picker' ).hide();
						placeholderElement.show();
						clearElement.hide();
						placeholderElement.css( 'line-height', '0' );
					}

					$( document ).trigger( 'wapo-colorpicker-clear', addonOpt[0] );

				}
			};

			function inicializeAddonColorpickers() {

				// Initialize each colorpicker with wpColorPicker function.
				$( '.yith-wapo-block .yith-wapo-addon-type-colorpicker .wp-color-picker' ).each(
					function() {
						$( this ).wpColorPicker( colorPicker_opt );

						let pickerContainer = $( this ).closest( '.wp-picker-container' );
						let pickerText      = pickerContainer.find( 'button .wp-color-result-text' );
						let clearButton     = pickerContainer.find( '.wp-picker-default' );
						let pickerInputWrap = pickerContainer.find( '.wp-picker-input-wrap' );
						let colorPickerShow = $( this ).data( 'addon-colorpicker-show' );
						let placeholder     = $( this ).data( 'addon-placeholder' );

						// Hide always the picker text
						pickerText.html( '' );

						// Create an custom element to show the custom Clear button.
						let wrap_main1 = $( this ).parents( '.wp-picker-container' ),
							wrap1          = wrap_main1.find( '.wp-picker-input-wrap' );

						if ( ! wrap_main1.hasClass( 'yith-wapo-colorpicker-initialized' ) ) {
							wrap_main1.addClass( 'yith-wapo-colorpicker-initialized' );
						}

						if ( ! wrap1.find( '.wp-picker-default-custom' ).length ) {
							var button = $( '<span/>' ).attr(
								{
									class: 'wp-picker-default-custom'
								}
							);
							wrap1.find( '.wp-picker-default, .wp-picker-clear' ).wrap( button );
						}

						// If it's placeholder option, create a custom element to show the placeholder label.
						if ( 'placeholder' === colorPickerShow ) {
							pickerInputWrap.find( '.wp-color-picker' ).hide();
							if ( ! pickerInputWrap.find( '.wp-picker-custom-placeholder' ).length ) {
								var placeholder_el = $( '<span/>' ).attr(
									{
										class: 'wp-picker-custom-placeholder',
									}
								);
								placeholder_el.html( placeholder );
								pickerInputWrap.find( '.screen-reader-text' ).before( placeholder_el );
							}
							let clearElement       = pickerContainer.find( '.wp-picker-default-custom' );
							let placeholderElement = pickerContainer.find( '.wp-picker-custom-placeholder' );

							clearElement.hide();
							placeholderElement.css( 'line-height', '0' );
						}

						clearButton.trigger( 'click' );

					}
				);
			}

			$( document ).on( 'yith-wapo-after-reload-addons', inicializeAddonColorpickers );
			$( document ).on( 'yith-wapo-after-reload-addons', initDatePickers );

			checkColorPickerOnInput = function() {
				$( document ).on(
					'click',
					function (e) {
						if ( ! $( e.target ).is( '.yith-wapo-colorpicker-container .iris-picker, .yith-wapo-colorpicker-container .iris-picker-inner' ) ) {
							let initializedColorPickers = $( '.yith-wapo-colorpicker-container .yith-wapo-colorpicker-initialized .wp-color-picker' );
							if ( initializedColorPickers.length > 0 ) {
								initializedColorPickers.iris( 'hide' );
							}
							return;
						}
					}
				);
				$( '.yith-wapo-colorpicker-container .yith-wapo-colorpicker-initialized .wp-color-picker' ).click(
					function ( event ) {
						$( this ).iris( 'show' );
						return;
					}
				);
			};

			inicializeAddonColorpickers();
			checkColorPickerOnInput();

		};

		/**
		 * Init the datepicker input
		 */
		initDatePickers = function() {

			// Initialize each colorpicker with wpColorPicker function.
			$( '.yith-wapo-block .yith_wapo_date.datepicker' ).each(
				function() {
					let datepicker_input = $( this );
					initDatePicker( datepicker_input );
				}
			);


		};

		initTimePicker = function( datepicker_input ) {
			let params             = datepicker_input.data( 'params' ),
				timeData           = params.time_data ? params.time_data : '',
				showTimeSelector    = params.show_time_selector ? params.show_time_selector : '';

			if ( typeof timeData === 'object' && timeData !== null ) {
				timeData = Object.values(timeData);
			}
			if ( showTimeSelector ) {
				setTimeout( function() {
					if ( ! $('#wapo-datepicker-time').length ) {
						var timeDataHTML = '',
							tempTimeEl = datepicker_input.closest( '.date-container' ).find( '.temp-time' ).text();
						$( timeData ).each(function( index, value ) {
							if ( value !== tempTimeEl ) {
								timeDataHTML += '<option>' + value + '</option>'
							} else {
								timeDataHTML += '<option selected>' + value + '</option>'
							}
						} );
						var timeHTML = '<div id="wapo-datepicker-time"><label>' + yith_wapo.i18n.datepickerSetTime + '</label><select id="wapo-datepicker-time-select">' +
							timeDataHTML
							+ '</select></div>'
							+ '<div id="wapo-datepicker-save"><button>' + yith_wapo.i18n.datepickerSaveButton + '</button></div>';

						$( timeHTML ).appendTo('#ui-datepicker-div');
					}
				}, 10 );
			}
		}

		initDatePicker = function( datepicker_input ) {

			var params = datepicker_input.data( 'params' ),
				minimumDate         = '',
				maximumDate         = '',
				startYear           = params.start_year ? params.start_year : '',
				endYear             = params.end_year ? params.end_year : '',
				defaultDateSelected = params.default_date ? params.default_date : '',
				dateFormat          = params.date_format ? params.date_format : '',
				additional_opts 	= params.additional_opts ? params.additional_opts : '';

			if ( startYear ) {
				minimumDate = new Date( params.start_year, '00', '01' );
			}
			if ( endYear ) {
				maximumDate = new Date( params.end_year, '11', '31' );
			}

			// datepicker options: https://api.jqueryui.com/datepicker/

			var datePicker_opts = {
				minDate: minimumDate,
				maxDate: maximumDate,
				defaultDate: defaultDateSelected,
				dateFormat: dateFormat,
				beforeShowDay: function( date ) {
					let params         = datepicker_input.data( 'params' ),
						selectableDaysOpt  = params.selectable_days_opt ? params.selectable_days_opt : '',
						selectableDays     = params.selectable_days ? params.selectable_days : '',
						selectedItems      = params.selected_items ? params.selected_items : '',
						enabled            = params.enable_disable_date_rules ? params.enable_disable_date_rules : '',
						returnValue    	   = true;

					enabled            = ( 'enable' === enabled ) ? 1 : 0;

					if ( enabled ) {
						returnValue = false;
					}

					// Selectable days (MIN/MAX)
					if ( 'days' === selectableDaysOpt || 'date' === selectableDaysOpt ) {
						let currentDate = date.getDate() + '-' + ( date.getMonth() + 1 ) + '-' + date.getFullYear();
						if ( -1 === $.inArray( currentDate, selectableDays ) ) {
							returnValue = false;
							return false;
						}
						//Disable days before current day.
					} else if ( 'before' === selectableDaysOpt ) {
						let currentDate = date.getTime();
						let todayDate   = new Date();
						let currentHour = new Date().getHours();
						todayDate.setHours( 0, 0, 0, 0 ); // Set date to midnight
						todayDate       = todayDate.getTime();
						if ( currentDate < todayDate || ( yith_wapo.disableCurrentDayBasedOnTime && currentDate <= todayDate && currentHour >= yith_wapo.datepickerHourToCheck ) ){
							return false;
						}
					}

					// Selected Items (Specific days)
					if ( selectedItems.length > 0 ) {
						selectedItems = JSON.parse( selectedItems );
						$.each( selectedItems, function( i, items ) {
							if ( 'days' === i ) {
								let currentDate = new Date( date );
								$.each( items, function ( i, item ) {
									let [ item_y, item_m, item_d ] = item.split('-');
									let selectedDay = new Date( parseInt(item_y), parseInt(item_m) - 1, parseInt(item_d) );
									if (currentDate.toDateString() === selectedDay.toDateString()) {
										returnValue = !! enabled;
										return false;
									}
								});
							} else if ( 'daysweek' === i ) {
								let dayWeek = date.getDay();
								$.each( items, function ( i, item ) {
									$.each( item, function (e, day) {
										if (dayWeek == day) {
											returnValue = !! enabled;
											return false;
										}
									});
								});
							} else if ( 'months' === i ) {
								let dateMonth = date.getMonth();
								$.each( items, function( i, item ) {
									$.each( item, function( e, month ) {
										if ( dateMonth == month -1 ) {
											returnValue = !! enabled;
											return false;
										}
									} );
								} );
							} else if ( 'years' === i ) {
								let dateYear = date.getFullYear();
								$.each( items, function( i, item ) {
									$.each( item, function( e, year ) {
										if ( dateYear == year ) {
											returnValue = !! enabled;
											return false;
										}
									} );
								} );
							}
						});
					}

					// Enable or disable specific date using WP-Hooks
					const { addonId, optionId } = datepicker_input.attr( 'name' ).match( /\[(?<addonId>[\d]+)-(?<optionId>[\d]+)\]$/ ).groups;
					returnValue = wp.hooks.applyFilters( 'yith_wapo_addon_datepicker_before_show_day', returnValue, date, addonId, optionId );

					if ( returnValue ) {
						return [true];
					}
					return [false];
				},
				beforeShow: function ( datepicker ) {
					initTimePicker( datepicker_input );
				},
				onSelect: function( dateText, obj ) {
					if ( $( obj.dpDiv ).find( '#wapo-datepicker-time-select' ).length > 0 ) {
						let timeSelected = $( obj.dpDiv ).find( '#wapo-datepicker-time-select' ).val(),
							tempTimeEl = $( this ).closest( '.date-container' ).find( '.temp-time' );
						$( this ).val( dateText + ' ' + timeSelected );
						tempTimeEl.text( timeSelected );
					}

					let addonOpt = $( '#' + obj.id );
					addonOpt.change();

				},
				onChangeMonthYear: function( year, month, inst ) {
					initTimePicker( datepicker_input );
				},
				onUpdateDatepicker: function( ins ) {
					$( '#ui-datepicker-div' ).attr( 'wapo-option-id', ins.id );
				},
				onClose: function( date, ins ) {
					$( this ).trigger( 'yith_wapo_date_field_updated', date );
				},
			}

			// additional parameters added with the yith_wapo_datepicker_options filter
			datePicker_opts = Object.assign( datePicker_opts, additional_opts );

			datepicker_input.datepicker(
				datePicker_opts
			);

		}

		initColorpicker();
		initDatePickers();
	}
);

jQuery( document ).ready(
	function ($) {
		var firstVariationLoading = false;
		var wapoDOM = {
			editProductCartLink : '.yith-wapo-edit-product-cart',
			individualAddons    : '.yith-wapo-individual-addons',
			cartPopup           : '.yith-wapo-popup',
			popupOverlay		: '.yith-wapo-overlay',
			popupClose		    : '.yith-wapo-close',
			popupWrapper		: '.yith-wapo-wrapper',
			popupContent		: '.yith-wapo-content',
			popupFooter		    : '.yith-wapo-footer',
			addToCartButton		: '.yith-wapo-popup .single_add_to_cart_button',
			popupForm		    : '.yith-wapo-popup form.cart',
			popupVariationForm  : '.yith-wapo-popup form.variations_form',
			addonsContainer		: '#yith-wapo-container',
			hiddenItemKey		: '.yith-wapo-cart-item-key',
			addonImageInput     : '#yith_wapo_product_img',
			formCart			: 'form.cart',
			totalPriceTable		: '#wapo-total-price-table',
			wcProductGallery    : '.woocommerce-product-gallery',
			variationForm       : 'form.variations_form',
			totalsBox			: {
				productPrice : '#wapo-total-product-price',
				optionsPrice : '#wapo-total-options-price',
				orderPrice	 : '#wapo-total-order-price'
			}
		}

		var wapoArgs = {
			numDecimals : parseInt(yith_wapo.number_decimals)
		}

		var pa_modal = $( wapoDOM.cartPopup );

		initJS 			= function() {
			if ( $( wapoDOM.variationForm ).length < 1 ) { // If it's a variable product, we don't calculate price initially. Only on found_variation trigger.
				calculateTotalAddonsPrice();
			}
			checkSelectorsOnLoad();
			checkDefaultOptionsOnLoad();
			moveEditProductLinkOnCart();

			$( document ).on( 'updated_wc_div', moveEditProductLinkOnCart ); // Move link after updating cart.
			$( document ).on( 'click', wapoDOM.addToCartButton, addToCart );
			$( document ).on( 'click', wapoDOM.editProductCartLink, openEditAddonsModal );
			$( document ).on( 'click', wapoDOM.popupClose + ',' + wapoDOM.popupOverlay, closeModal );
			$( window ).on( "resize", centerEditModal );

		}

		addToCart			= function(e) {

			e.preventDefault();
			e.stopPropagation();

			if ( ! checkAddonsRequirements() ) {
				return false;
			}

			var cartItemKey   = $( wapoDOM.hiddenItemKey ).val();
			var productId     = $( wapoDOM.popupVariationForm ).find( '.product_id' ).val();
			var variationId   = $( wapoDOM.popupVariationForm ).find( '.variation_id' ).val();

			var individualCartItems = $( '.yith-wapo-individual-addons.parent-key-' + cartItemKey );
			var individualCartKeys  = [];

			$.each( individualCartItems, function() {
				individualCartKeys.push( $(this).data( 'cart-item-key' ) );
			} );

			var data     = {
				'action'	           : 'ywapo_update_addons_on_cart_item',
				'cart_item_key'        : cartItemKey,
				'individual_item_key'  : individualCartKeys,
				'product_id'           : productId,
				'variation_id'         : variationId,
				'addons' 		       : $( wapoDOM.popupForm ).serializeArray(),
				'security'             : yith_wapo.addons_nonce,
			}

			$.ajax(
				{
					url: yith_wapo.ajaxurl,
					type: 'post',
					data: data,
					beforeSend: function(){

					},
					error: function (xhr, status, error) {
						// Code to handle errors.
						console.error('AJAX request failed: ', status, error);
					},
					success: function (response) {
						if (response) {
							if ( response['success'] ) {
								closeModal();

								if ( yith_wapo.wc_blocks.has_cart_block ) {
									// WC Blocks cart update.
									const CART_STORE_KEY = window.wc.wcBlocksData.CART_STORE_KEY;

									// Returns an action object used in signalling that the resolution cache should be invalidated for the entire store.
									window.wp.data.dispatch( CART_STORE_KEY ).invalidateResolutionForStore();
									// Return and update cart data.
									window.wp.data.select( CART_STORE_KEY ).getCartData();

								} else {
									$( document ).trigger( 'wc_update_cart' );
								}
							}
						}
					}
				}
			);
		}

		centerEditModal		= function() {

			var t        = $( wapoDOM.popupWrapper ),
				window_w = $(window).width(),
				window_h = $(window).height(),
				width    = yith_wapo.isMobile ? $(window).width() : $(window).width() / 1.5,
				height   = yith_wapo.isMobile ? $(window).height() : $(window).height() / 1.3;

			t.css({
				'left'      : ( ( window_w/2 ) - ( width/2 ) ),
				'top'       : ( ( window_h/2 ) - ( height/2 ) ),
				'width'     : width + 'px',
				'height'    : height + 'px'
			});
		};

		loadProduct		= function( link ) {

			centerEditModal();

			$( wapoDOM.popupWrapper ).block({ message: null, overlayCSS: { opacity: 0 } });

			var productId      = link.data( 'product_id' );
			var variationId    = link.data( 'variation_id' );
			var cartItemKey    = link.data( 'cart-item-key' );

			var data   = {
				'action'	     : 'ywapo_load_product_template',
				'product_id'     : productId,
				'variation_id'   : variationId,
				'cart_item_key'  : cartItemKey,
				'security'       : yith_wapo.addons_nonce,
			}

			$.ajax(
				{
					url : yith_wapo.ajaxurl,
					type : 'post',
					data : data,
					error: function(xhr, status, error) {
						// Code to handle errors
						console.error('AJAX request failed: ', status, error);
					},
					beforeSend: function() {
						link.block({
							message   : null,
							overlayCSS: {
								background: '#fff url(' + yith_wapo.loader + ') no-repeat center/30%',
								opacity   : 0.5,
								cursor    : 'none'
							}
						});
					},
					success : function( response ) {
						if ( response ) {

							var variation      = response['variation'] && '' !== response['variation'] ? response['variation'] : undefined;
							var quantity       = response['quantity'] ?? '';
							var wcclData       = response['wccl-data'] ?? '';
							var addonImageURL  = response['addon_image'] ?? '';
							var quantities     = response['quantities'] ?? '';
							var addonsSelected = response['addons'] ?? '';

							// Add the product page to the content.
							$( wapoDOM.popupContent ).html( response['html'] );

							if ( typeof wc_add_to_cart_variation_params !== 'undefined' ) {
								$(wapoDOM.popupVariationForm).each(function () {
									$(this).wc_variation_form();
								});
							}

							// Init datepickers.
							initDatePickers();

							// Init colorpickers.
							initColorpicker();

							// Init product gallery.
							$( wapoDOM.wcProductGallery ).wc_product_gallery();

							// Set variations.
							if ( variation != undefined ) {
								setVariation( variation );
							}

							// Color and Label module or plugin.
							if ( wcclData !== '' ) {
								// TODO: Fix wccl.
								$.yith_wccl(wcclData);
							}

							moveAddToCartButton();

							var itemKey = link.data( 'cart-item-key' );
							$( wapoDOM.hiddenItemKey ).val( itemKey );

							addonsSelection( addonsSelected );

							if ( quantities ) {
								addonsQuantity( quantities );
							}

							if ( quantity > 0 ) {
								setQuantity( quantity );
							}

							if ( addonImageURL ) {
								replaceAddonImage( addonImageURL );
							}

							// Calculate add-on prices.
							calculateTotalAddonsPrice();

						}
					},
					complete : function () {
						$( wapoDOM.popupWrapper ).unblock({ message: null });
						link.unblock({ message: null });

						pa_modal.addClass('open');
						$( 'body' ).addClass( 'yith-wapo-modal-is-open' );
					}
				}
			);
		}

		moveAddToCartButton				= function() {
			var button = $( wapoDOM.popupContent ).find( '.single_add_to_cart_button' );
			if ( button ) {
				$( wapoDOM.popupFooter ).find( '.yith-wapo-add-to-cart' ).prepend( button );
			}
		}

		replaceAddonImage               = function( addonImageURL ) {

			var defaultPath     = yith_wapo.replace_image_path;
			var zoomMagnifier   = '.yith_magnifier_zoom_magnifier, .zoomWindowContainer .zoomWindow';;

			$( defaultPath ).attr( 'src', addonImageURL );
			$( defaultPath ).attr( 'srcset', addonImageURL );
			$( defaultPath ).attr( 'data-src', addonImageURL );
			$( defaultPath ).attr( 'data-large_image', addonImageURL );
			$( zoomMagnifier ).css( 'background-image', 'url(' + addonImageURL + ')' );

			$( wapoDOM.addonImageInput ).val( addonImageURL );

			// Reset gallery position.
			if ( $( '.woocommerce-product-gallery .woocommerce-product-gallery__image' ).length > 0 ) {
				$( wapoDOM.wcProductGallery ).trigger( 'woocommerce_gallery_reset_slide_position' );
			}

			$( wapoDOM.wcProductGallery ).trigger( 'woocommerce_gallery_init_zoom' );

			$( document ).trigger( 'yith-wapo-after-replace-image' );

		}

		openEditAddonsModal 			= function(e) {
			e.preventDefault();
			e.stopPropagation();

			loadProduct( $(this) );

		}

		closeModal 			= function() {
			pa_modal.removeClass('open');
			$( 'body' ).removeClass( 'yith-wapo-modal-is-open' );

			setTimeout( // Wait for closing transition and then we clear the HTML.
				function() {
					$( wapoDOM.popupContent ).html('');
					$( wapoDOM.popupFooter ).find( '.yith-wapo-add-to-cart' ).html('');
				},
				400
			)
		}

		moveEditProductLinkOnCart		= function() {
			$( wapoDOM.editProductCartLink ).each( function() {
				var link = $(this);
				var productNameRow = link.closest( '.product-name' );

				productNameRow.append( link );

			} );
		}

		setVariation 					= function(t_variation) {
			var form = $( 'form.variations_form.cart' );

			for ( let attribute in t_variation.attributes ) {

				let attribute_sel = $("select[name='" + attribute + "']");
				let value         = t_variation.attributes[attribute];
				if ( value && attribute_sel.length > 0 ) {
					attribute_sel.val( value );
				}
			}
		}

		addonsSelection				= function( addons ) {
			var filesIndex = 0;
			for ( var i in addons ) {
				var addonObj = addons[i];

				for ( var addonIndex in addonObj ) {
					var addonVal  = addonObj[addonIndex];
					var addonOpts = addonIndex.split('-');

					let addonID = addonOpts[0] ?? '';
					let addonOption = addonOpts[1] ?? '';

					var addon     = $( '#yith-wapo-addon-' + addonID ).get(0);
					var addonType = $( addon ).data( 'addon-type' );

					if ( '' === addonVal ) {
						continue;
					}

					var addonOpt = '';

					switch (addonType) {

						case 'checkbox':
						case 'label':
						case 'color':
						case 'product':
							addonOpt = $( addon ).find( '#yith-wapo-' + addonID + '-' + addonOption );
							if ( ! addonOpt.is(':checked') ) {
								$(addonOpt).click();
							}
							break;
						case 'radio':
							addonOpt = $( addon ).find( '#yith-wapo-' + addonID + '-' + addonVal );
							addonOpt.click();
							break;
						case 'text':
						case 'textarea':
						case 'number':
						case 'date':
							addonOpt = $( addon ).find( '#yith-wapo-' + addonID + '-' + addonOption );
							addonOpt.val( addonVal );
							break;
						case 'colorpicker':
							addonOpt = $( addon ).find( '#yith-wapo-' + addonID + '-' + addonOption );
							addonOpt.val( addonVal );
							addonOpt.trigger('change');
							break;
						case 'select':
							addonOpt = addonOpt = $( addon ).find( '#yith-wapo-' + addonID );
							addonOpt.val( addonVal );
							break;
						case 'file':
							var option = $( '#yith-wapo-option-' + addonID + '-' + addonOption );

							loadUploadedFile(
								{
									'addon'        : $(addon),
									'option'       : option,
									'addonVal'     : addonVal,
									'addonIndex'   : addonIndex,
									'index'        : filesIndex,
									'fileSize'     : ''
								}
							);

							filesIndex++;
							break;
					}
				} // end second for loop
			} // end first for loop

			maybeHideImageUploaded();

		}

		loadUploadedFile					= function(data) {

			let addon       = data.addon ?? '';
			let option      = data.option ?? '';
			let addonVal    = data.addonVal ?? '';
			let addonIndex  = data.addonIndex ?? '';
			let index       = data.index ?? '';
			let size        = data.fileSize ?? '';

			addonVal    = $.isArray( addonVal ) ? addonVal[0] : addonVal;

			let name    = addonVal.split('/').reverse()[0] ?? '';
			let isImage = addonVal.endsWith( 'jpeg' ) || addonVal.endsWith( 'jpg' ) || addonVal.endsWith( 'png' );

			var fileTemplate          = wp.template( 'yith-wapo-uploaded-file-template' );
			var uploadedFileContainer = $( option ).find( '.yith-wapo-uploaded-file' );

			var fileData = {
				'fileIndex': index,
				'fileName' : name,
				'fileSize' : size,
				'optionId' : addonIndex,
				'image'    : isImage ? addonVal : '',
				'addonVal' : addonVal,
			};

			uploadedFileContainer.append(
				fileTemplate( fileData )
			);

			uploadedFileContainer.closest( '.file-container' ).find( '.upload-parent' ).val(1);

			uploadedFileContainer.show();
			maybeHideUploadButton( option );

		}
		maybeHideImageUploaded				= function() {

			$( '.yith-wapo-addon-type-file .yith-wapo-img-uploaded' ).each( function() {
				if ( ! $(this).attr('src') ) {
					$(this).hide();
				}
			} );

		}
		maybeHideUploadButton				= function( option ) {

			let maxMultiple = option.data( 'max-multiple' );

			if ( option.find( '.yith-wapo-uploaded-file-element' ).length >= maxMultiple ) {
				option.find( '.yith-wapo-ajax-uploader-container' ).hide();
			}

		}

		checkAddonsRequirements				= function() {
			let numbersCheck = checkNumbersTotalValues(),
				minMaxResult = checkRequiredMinMax();

			if ( ! numbersCheck ) { // if it's not true, do not allow to add to cart.
				return false;
			}

			if ( ! minMaxResult && ! yith_wapo.disable_scroll_on_required_mix_max ) {
				$( 'html, body, .yith-wapo-content' ).animate( { scrollTop: $( wapoDOM.addonsContainer ).offset().top - 20 }, 500 );
			}

			return minMaxResult;
		},
			checkRequiredFields = function (action) {

				var isRequired = false;
				var hideButton = false;
				var buttonClasses = yith_wapo.dom.single_add_to_cart_button;
				$('form.cart .yith-wapo-addon:not(.hidden):visible input, form.cart .yith-wapo-addon:not(.hidden):visible select, form.cart .yith-wapo-addon:not(.hidden):visible textarea').each(
					function () {
						let element = $(this);
						let parent = element.closest('.yith-wapo-option');
						let addon = element.closest('.yith-wapo-addon');
						let toggle_addon = element.closest('div.yith-wapo-addon.wapo-toggle');
						let toggle_addon_title = toggle_addon.find('.wapo-addon-title.toggle-closed');
						let addonTitle = addon.find('.wapo-addon-title');

						if ('file' === element.attr('type') || element.hasClass('wapo-product-qty')) {
							return;
						}

						if (
							element.attr('required') && ('checkbox' === element.attr('type') // checkboxes
								|| 'radio' === element.attr('type')) && !element.closest('.yith-wapo-option').hasClass('selected') // radio
							|| element.attr('required') && 'checkbox' !== element.attr('type') && 'radio' !== element.attr('type') && (element.val() == '' || element.val() == 'Required')
						) {
							if (action === 'highlight') {
								// Add required message.
								showRequiredMessage(element);
								addonTitle.addClass('wapo-error');


								// Open toggle.
								if (toggle_addon_title) {
									toggle_addon_title.click();
								}
							}

							hideButton = true;
							isRequired = true;
						} else {
							// Restart default required status.
							restartRequiredElement(element);
						}
					}
				);

				return !isRequired;
			},

			/** Print the required element with the message and colors */
			showRequiredMessage = function (element) {
				let option = element.closest('.yith-wapo-option');
				if (option.find('.required-error').length < 1) {
					option.append(
						'<div class="required-error">' +
						'<small class="required-message">' + yith_wapo.messages.requiredMessage + '</small>' +
						'</div>'
					);

					option.addClass('required-color');
				}

			},

			/** Restart the required element (removing it) and remove Color classes */
			restartRequiredElement = function( element ) {
				let option = element.closest( '.yith-wapo-option' );
				element.closest( '.yith-wapo-option' ).find( '.required-error' ).remove();
				option.removeClass( 'required-color' );
			},

			/**
			 * Conditional Logic
			 */
			conditionalLogicCheck 	  = function( lastFinalConditions = {} ) {
				var finalConditions = {};

				$( 'form.cart .yith-wapo-addon.conditional_logic' ).each(
					function() {

						var AddonConditionSection = false,
							AddonVariationSection = false;

						var logicDisplay = $(this).data('conditional_logic_display'); // show / hide

						// Applied to conditions.
						var logicDisplayIf = $(this).data('conditional_logic_display_if'); // all / any

						var ruleAddon = String($(this).data('conditional_rule_addon')),
							ruleAddonIs = String($(this).data('conditional_rule_addon_is')),
							ruleVariation = String($(this).data('conditional_rule_variations'));

						ruleAddon = (typeof ruleAddon !== 'undefined' && ruleAddon !== "0" && ruleAddon !== '') ? ruleAddon.split('|') : false; // addon number
						ruleAddonIs = (typeof ruleAddonIs !== 'undefined' && ruleAddonIs !== '') ? ruleAddonIs.split('|') : false; // selected / not-selected / empty / not-empty
						ruleVariation = (typeof ruleVariation !== 'undefined' && ruleVariation !== '') ? ruleVariation.split('|') : false; // variations number

						if (!ruleVariation && (!ruleAddon || !ruleAddonIs)) {  // Show addon if no variations conditions or addons conditions.

							AddonConditionSection = true;
							AddonVariationSection = true;
							logicDisplay = 'show';

						} else {

							// ConditionLogic.
							if (ruleAddon && ruleAddonIs) {

								switch (logicDisplayIf) {

									case 'all':
										AddonConditionSection = conditionalLogicAllRules(ruleAddon, ruleAddonIs);
										break;

									case 'any':
										AddonConditionSection = conditionalLogicAnyRules(ruleAddon, ruleAddonIs);
										break;

								}

							} else {
								AddonConditionSection = true;
							}

							if (AddonConditionSection && ruleVariation) { // Prevent check variations if addons condition fails.
								var variationProduct = $('.variation_id').val();
								if (-1 !== $.inArray(String(variationProduct), ruleVariation)) {
									AddonVariationSection = true;
								}

							} else {
								AddonVariationSection = true;
							}

						}

						switch (logicDisplay) {

							case 'show' :

								if (AddonVariationSection && AddonConditionSection) { // Both conditions true --> apply logic Display
									finalConditions[$(this).attr('id')] = 'not-hidden';
								} else {
									finalConditions[$(this).attr('id')] = 'hidden';
								}
								break;

							case 'hide' :
								if (AddonVariationSection && AddonConditionSection) {  // Both conditions true --> apply logic Display
									finalConditions[$(this).attr('id')] = 'hidden';
								} else {
									finalConditions[$(this).attr('id')] = 'not-hidden';
								}
						}
					}
				);

				$.each(
					finalConditions,
					function( id, mode ) {
						let element = $( '#' + id );

						var isHidden = element.hasClass( 'hidden' );

						if ( 'not-hidden' === mode ) {

							// Todo: We avoid out of stock to change disabled value.
							if( yith_wapo.conditionalDisplayEffect === 'slide' ){
								element.slideDown().removeClass( 'hidden' ).find( '.yith-wapo-option:not(.out-of-stock) .yith-wapo-option-value' ).attr( 'disabled', false );
							}else{
								element.fadeIn().removeClass( 'hidden' ).find( '.yith-wapo-option:not(.out-of-stock) .yith-wapo-option-value' ).attr( 'disabled', false );
							}

							// Re-enable select add-ons if it was hidden
							if ( element.hasClass( 'yith-wapo-addon-type-select' ) ){
								element.find( '.yith-wapo-option-value' ).attr( 'disabled', false );
							}

							// Check the min_max after disable value.
							checkMinMax( element );

						} else if ( yith_wapo.conditionalDisplayEffect === 'slide' ) {
							element.slideUp().addClass( 'hidden' ).find( '.yith-wapo-option-value' ).attr( 'disabled', true );
						} else {
							element.hide().addClass( 'hidden' ).find( '.yith-wapo-option-value' ).attr( 'disabled', true );
						}

					}
				);

				if ( JSON.stringify( finalConditions ) !== JSON.stringify( lastFinalConditions ) ) {
					conditionalLogicCheck( finalConditions );
				}

				$(document).trigger('wapo_after_conditional_logic_check');

			}

		/**
		 * Conditional Rule AND
		 *
		 * @param ruleAddon
		 * @param ruleAddonIs
		 * @returns {boolean}
		 */
		conditionalLogicAllRules 			= function( ruleAddon, ruleAddonIs ) {
			var conditional = true;

			for ( var x = 0; x < ruleAddon.length; x++ ) {

				if ( ruleAddon[x] == 0 || ! ruleAddon[x] ) {
					continue;
				}

				var ruleAddonSplit = ruleAddon[x].split( '-' );
				var AddonSelected  = false;
				var AddonNotEmpty  = false;

				// variation check
				if ( typeof ruleAddonSplit[1] != 'undefined' ) {

					AddonSelected = ( // Selector or checkbox
						$( '#yith-wapo-' + ruleAddonSplit[0] + '-' + ruleAddonSplit[1] ).is( ':checked' )
						|| $( 'select#yith-wapo-' + ruleAddonSplit[0] ).val() == ruleAddonSplit[1]
					) && ! $( '#yith-wapo-addon-' + ruleAddonSplit[0] ).hasClass( 'hidden' );

					var typeText     = $( 'input#yith-wapo-' + ruleAddonSplit[0] + '-' + ruleAddonSplit[1] ).val();			// text
					var typeTextarea = $( 'textarea#yith-wapo-' + ruleAddonSplit[0] + '-' + ruleAddonSplit[1] ).val();		// textarea
					AddonNotEmpty    = (
						( typeof typeText != 'undefined' && typeText !== '' )
						|| ( typeof typeTextarea != 'undefined' && typeTextarea !== '' )
					) && ! $( '#yith-wapo-addon-' + ruleAddonSplit[0] ).hasClass( 'hidden' );

					// addon check
				} else {
					AddonSelected = (
						$( '#yith-wapo-addon-' + ruleAddon[x] + ' input:checkbox:checked' ).length > 0
						|| $( '#yith-wapo-addon-' + ruleAddon[x] + ' input:radio:checked' ).length > 0
						|| $( '#yith-wapo-addon-' + ruleAddon[x] + ' option:selected' ).length > 0
						&& 'default' != $( '#yith-wapo-addon-' + ruleAddon[x] + ' option:selected' ).val() // Check if not default value of Select Add-on
					);
					AddonSelected = AddonSelected && ! $( '#yith-wapo-addon-' + ruleAddon[x] ).hasClass( 'hidden' );

					var typeText = 'undefined';
					$( '#yith-wapo-addon-' + ruleAddonSplit[0] + ' input, #yith-wapo-addon-' + ruleAddonSplit[0] + ' textarea' ).each(
						function( index ){
							if ( $( this ).val() !== '' ) {
								typeText = true;
								return;
							}
						}
					);
					AddonNotEmpty = (
						( typeText != 'undefined' && typeText !== '')
						// || (typeof typeTextarea != 'undefined' && typeTextarea !== '')
					) && ! $( '#yith-wapo-addon-' + ruleAddonSplit[0] ).hasClass( 'hidden' );
				}

				switch ( ruleAddonIs[x]  ) {
					case 'selected' :
						if ( ! AddonSelected ) {
							conditional = false;
						}
						break;
					case 'not-selected':
						if ( AddonSelected ) {
							conditional = false;
						}
						break;

					case 'empty' :
						if ( AddonNotEmpty ) {
							conditional = false;
						}
						break;

					case 'not-empty' :
						if ( ! AddonNotEmpty ) {
							conditional = false;
						}

						break;
				}

				if ( ! conditional ) {
					break;
				}

			}

			return conditional;

		}

		/**
		 * Conditional Rule OR
		 *
		 * @param ruleAddon
		 * @param ruleAddonIs
		 * @returns {boolean}
		 */
		conditionalLogicAnyRules = function (ruleAddon, ruleAddonIs) {

			var conditional = false;

			for (var x = 0; x < ruleAddon.length; x++) {

				if (ruleAddon[x] == 0 || !ruleAddon[x]) {
					continue;
				}
				var ruleAddonSplit = ruleAddon[x].split('-');

				// variation check
				if (typeof ruleAddonSplit[1] != 'undefined') {

					AddonSelected = ( // Selector or checkbox
						$('#yith-wapo-' + ruleAddonSplit[0] + '-' + ruleAddonSplit[1]).is(':checked')
						|| $('select#yith-wapo-' + ruleAddonSplit[0]).val() == ruleAddonSplit[1]
					) && !$('#yith-wapo-addon-' + ruleAddonSplit[0]).hasClass('hidden');

					var typeText = $('input#yith-wapo-' + ruleAddonSplit[0] + '-' + ruleAddonSplit[1]).val();			// text
					var typeTextarea = $('textarea#yith-wapo-' + ruleAddonSplit[0] + '-' + ruleAddonSplit[1]).val();		// textarea
					AddonNotEmpty = (
						(typeof typeText != 'undefined' && typeText !== '')
						|| (typeof typeTextarea != 'undefined' && typeTextarea !== '')
					) && !$('#yith-wapo-addon-' + ruleAddonSplit[0]).hasClass('hidden');

					// addon check
				} else {
					AddonSelected = (
						$('#yith-wapo-addon-' + ruleAddon[x] + ' input:checkbox:checked').length > 0
						|| $('#yith-wapo-addon-' + ruleAddon[x] + ' input:radio:checked').length > 0
						|| $('#yith-wapo-addon-' + ruleAddon[x] + ' option:selected').length > 0
						&& 'default' != $('#yith-wapo-addon-' + ruleAddon[x] + ' option:selected').val() // Check if not default value of Select Add-on
					);
					AddonSelected = AddonSelected && !$('#yith-wapo-addon-' + ruleAddon[x]).hasClass('hidden');

					var typeText = 'undefined';
					$('#yith-wapo-addon-' + ruleAddonSplit[0] + ' input, #yith-wapo-addon-' + ruleAddonSplit[0] + ' textarea').each(
						function (index) {
							if ($(this).val() !== '') {
								typeText = true;
								return;
							}
						}
					);
					AddonNotEmpty = (
						(typeText != 'undefined' && typeText !== '')
						// || (typeof typeTextarea != 'undefined' && typeTextarea !== '')
					) && !$('#yith-wapo-addon-' + ruleAddonSplit[0]).hasClass('hidden');
				}

				switch (ruleAddonIs[x]) {
					case 'selected' :
						if (AddonSelected) {
							conditional = true;
						}
						break;
					case 'not-selected':
						if (!AddonSelected) {
							conditional = true;
						}
						break;

					case 'empty' :
						if (!AddonNotEmpty) {
							conditional = true;
						}
						break;

					case 'not-empty' :
						if (AddonNotEmpty) {
							conditional = true;
						}

						break;
				}
				if (conditional) {
					break;
				}
			}

			return conditional;
		}

		calculateAddonsPrice 			= function () {
			var firstFreeOptions = 0,
				currentAddonID = 0,
				totalPrice = 0,
				totalPriceDefault = 0,
				quantity = $(yith_wapo.productQuantitySelector).val(), // Quantity of the Add to cart form.
				totals = {};

			if (!quantity > 0) {
				quantity = 1;
			}

			$('form.cart .yith-wapo-addon:not(.hidden):visible input, form.cart .yith-wapo-addon:not(.hidden):visible select, form.cart .yith-wapo-addon:not(.hidden):visible textarea').each(
				function () {

					let option = $(this),
						defaultProductPrice = parseFloat($(wapoDOM.addonsContainer).attr('data-product-price')),
						optionID = option.data('addon-id');

					if (optionID) {
						let optionType = option.attr('type'),
							priceMethod = option.data('price-method'),
							price = 0,
							defaultTotalPrice = 0,
							priceType = '',
							addon = option.parents('.yith-wapo-addon'),
							addonType = addon.data('addon-type'),
							addonQty = 1;

						if ('number' === optionType && 0 == option.val()) {
							return totalPrice;
						}

						if (option.is('textarea')) {
							optionType = 'textarea';
						}

						if (option.is(':checked') || option.find(':selected').is('option')
							|| (option.is('input:not([type=checkbox])') && option.is('input:not([type=radio])') && option.val() != '')
							|| (option.is('textarea') && option.val() != '')
						) {

							if (option.is('select')) {
								option = option.find(':selected');
							}

							if ('number' === optionType) {

								cleanError( option.closest( '.yith-wapo-option' ) );

								let dataMin   = parseInt( option.attr( 'min' ) );
								let dataMax   = parseInt( option.attr( 'max' ) );
								let numberVal = parseInt( option.val() );

								if ( numberVal > dataMax || numberVal < dataMin ) {
									let message = yith_wapo.messages.moreThanMax + ' ' + dataMax;

									if ( numberVal < dataMin ) {
										message = yith_wapo.messages.lessThanMin + ' ' + dataMin;
									}

									setError( option.closest( '.yith-wapo-option' ), message );

									return;
								}

								checkMultipliedPrice(option);
							}

							if ('text' === optionType || 'textarea' === optionType) {
								checkMultipliedLength(option);
							}

							if (currentAddonID != optionID) {
								currentAddonID = option.data('addon-id');
								firstFreeOptions = option.data('first-free-options');
							}

							if (option.data('first-free-enabled') == 'yes' && firstFreeOptions > 0) {
								firstFreeOptions--;
							} else {
								if (typeof option.data('price-type') != 'undefined' && '' !== option.data('price-type')) {
									priceType = option.data('price-type'); // Percentage or fixed.
								}

								let dataPriceSale = option.data('price-sale'),
									dataPrice = option.data('price'),
									defaultSalePrice = option.data('default-sale-price'),
									defaultPrice = option.data('default-price');

								if (typeof dataPriceSale != 'undefined' && '' !== dataPriceSale && dataPriceSale >= 0 && 'multiplied' !== priceType) {
									price = parseFloat(dataPriceSale);
									defaultTotalPrice = parseFloat(defaultSalePrice);
								} else if (typeof dataPrice != 'undefined' && '' !== dataPrice) {
									price = dataPrice;
									defaultTotalPrice = defaultPrice;
								}

								if ('percentage' === priceType && 'discount' !== priceMethod) {
									price = (price * defaultProductPrice) / 100;
									defaultTotalPrice = (defaultTotalPrice * defaultProductPrice) / 100;
								}

								if ('product' === addonType) {
									if (!option.hasClass('.yith-wapo-option')) {
										option = option.parents('.yith-wapo-option');
										addonQty = option.find('.wapo-product-qty');
										if (addonQty) {
											addonQty = addonQty.val();
											if (addonQty > 1) {
												price = price * addonQty;
												defaultTotalPrice = defaultTotalPrice * addonQty;
											}
										}
									}
								}

								// Multiply price by quantity. Not multiplied for Sell individually add-ons ( it will be 1 on cart ).
								if (quantity > 1 && !addon.hasClass('sell_individually')) {
									price = price * quantity;
									defaultTotalPrice = defaultTotalPrice * quantity;
								}

								price = parseFloat( price );

								totalPrice += price;
								totalPriceDefault += defaultTotalPrice;
							}
						}
					}
				}
			);

			totals = {
				'totalPrice'       : parseFloat( totalPrice ),
				'totalPriceDefault': parseFloat( totalPriceDefault )
			};

			return totals;
		};

		setTotalBoxPrices 			= function (defaultProductPrice, totalPrice, replacePrice = true, totalDefaultOptionsPrice = 0) {
			var quantity = $(yith_wapo.productQuantitySelector).val();

			if (!quantity > 0) {
				quantity = 1;
			}

			var totalProductPrice = defaultProductPrice * quantity,
				totalOptionsPrice = parseFloat(totalPrice),
				totalOrderPrice   = (parseFloat(totalProductPrice) + totalOptionsPrice).toFixed( wapoArgs.numDecimals );

			// Price without formatting.
			var total_ProductPrice = totalProductPrice,
				total_OptionsPrice = totalOptionsPrice;

			if ( ! yith_wapo.includeShortcodePriceSuffix ) {

				var totalOptionsPriceFormatted = floatToWcPrice(totalOptionsPrice); // Format price.
				var totalOrderPriceFormatted   = floatToWcPrice(totalOrderPrice); // Format price.

				$(wapoDOM.totalsBox.optionsPrice).html(totalOptionsPriceFormatted + ' ' + yith_wapo.priceSuffix );
				$(wapoDOM.totalsBox.orderPrice).html(totalOrderPriceFormatted + ' ' + yith_wapo.priceSuffix );

				var response = {
					'order_price_suffix': totalOrderPriceFormatted,
					'order_price_raw' : parseInt( $(wapoDOM.addonsContainer).attr('data-default-product-price') ) + parseInt( totalOptionsPrice ),
				};

				replaceProductPrice(totalOrderPrice, totalOrderPriceFormatted);

				$(document).trigger('wapo-after-calculate-product-price', response);


			} else { // Do the ajax calculation only if customer has {price_including_tax} / {price_excluding_tax} in WooCommerce > Tax > Price display suffix option.

				let savedOrderPrice = $(wapoDOM.addonsContainer).attr('data-order-price');

				// If previous order price is equal to the current calculated order price, it won't process the Ajax Calls.
				if (yith_wapo.preventAjaxCallOnUnchangedTotals && parseFloat(savedOrderPrice) === parseFloat(totalOrderPrice)) {
					$(wapoDOM.totalPriceTable).css('opacity', '1');
					return false;
				}

				var suffixData = {
					'product_id': parseInt($(wapoDOM.addonsContainer).attr('data-product-id')),
					'options_price': totalOptionsPrice,
					'options_default_price': totalDefaultOptionsPrice,
					'total_order_price': totalOrderPrice,
					'currency': yith_wapo.woocommerce_currency
				};


				// Update totals and table (AJAX call).
				calculateProductPrice(suffixData);
			}

			$(wapoDOM.totalPriceTable).css('opacity', '1');

			$(document).trigger('yith_wapo_product_price_updated', [total_ProductPrice + total_OptionsPrice]);
		},

			replaceProductPrice = function (totalOrderPrice, totalOrderPriceHtml) {

				if ('yes' !== yith_wapo.replace_price_in_product_without_addons && (!$(wapoDOM.addonsContainer).length || !$(wapoDOM.addonsContainer).find('.yith-wapo-block').length)) {
					return;
				}

				if ( yith_wapo.hide_order_price_if_zero && 0 === totalOrderPrice ) {
					totalOrderPriceHtml = '';
				}

				if ('yes' === yith_wapo.replace_product_price && !isNaN(parseFloat(totalOrderPrice)) && $(yith_wapo.replace_product_price_class).length > 0) {
					$(yith_wapo.replace_product_price_class).html('<span class="woocommerce-Price-amount amount"><bdi>' + totalOrderPriceHtml + '</bdi></span>');
				}
			},

			calculateProductPrice 			= function (suffixData) {

				$(document).trigger('wapo-before-calculate-product-price');

				var data_price_suffix = {
					'action': 'update_totals_with_suffix',
					'data': suffixData,
					'security': yith_wapo.addons_nonce,
				};

				$.ajax(
					{
						url: yith_wapo.ajaxurl,
						type: 'post',
						data: data_price_suffix,
						success: function (response) {
							if (response) {
								let totalProductPrice = response['price_html'],
									totalOptionsPriceHTML = response['options_price_suffix'],
									totalOrderPriceHTML = response['order_price_suffix'],
									totalOrderPrice = suffixData.total_order_price;

								$(wapoDOM.totalsBox.productPrice).html(totalProductPrice);
								$(wapoDOM.totalsBox.optionsPrice).html(totalOptionsPriceHTML);
								$(wapoDOM.totalsBox.orderPrice).html(totalOrderPriceHTML);

								$(wapoDOM.addonsContainer).attr('data-order-price', totalOrderPrice);

								replaceProductPrice(totalOrderPrice, totalOrderPriceHTML);

								$(document).trigger('wapo-after-calculate-product-price', response);
							}
						}
					}
				);
			},

			calculateTotalAddonsPrice 		= function (replacePrice = true) {

				//Check logical conditions before calculate prices.
				conditionalLogicCheck();

				if ('yes' === yith_wapo.hide_button_required) {
					var buttonClasses  = yith_wapo.dom.single_add_to_cart_button;

					$(buttonClasses).hide();

					var requiredFields = checkRequiredFields('hide'); // First check required options. True means all required options are already selected.
					var requiredMinMax = checkRequiredMinMax('hide');

					if ( requiredFields && requiredMinMax ) {
						$(buttonClasses).fadeIn();
					}
				}

				$(wapoDOM.totalPriceTable).css('opacity', '0.5');

				var totalPrice = 0;
				var totalDefaultPrice = 0;
				var defaultProductPrice = parseFloat($(wapoDOM.addonsContainer).attr('data-product-price'));
				var totalPriceBoxOption = yith_wapo.total_price_box_option;

				let selectedGifCardAmountButton = $('button.ywgc-amount-buttons.selected_button');

				if (selectedGifCardAmountButton.length > 0) {
					defaultProductPrice = selectedGifCardAmountButton.data('price');
				}

				var pricesCalculated = calculateAddonsPrice();

				totalPrice        = pricesCalculated.totalPrice;
				totalDefaultPrice = pricesCalculated.totalPriceDefault;

				// Plugin option "Total price box".
				if ('hide_options' === totalPriceBoxOption) {
					if (0 !== totalPrice) {
						$('#wapo-total-price-table .hide_options tr.wapo-total-options').fadeIn();
					} else {
						$('#wapo-total-price-table .hide_options tr.wapo-total-options').hide();
					}
				}

				setTotalBoxPrices(defaultProductPrice, totalPrice, replacePrice, totalDefaultPrice);

			};

		productQuantityChange 			= function () {
			let inputNumber = $(this),
				inputVal = inputNumber.val(),
				productId = inputNumber.closest('.yith-wapo-option').data('product-id'),
				addToCartLink = inputNumber.closest('.option-add-to-cart').find('.add_to_cart_button'),
				productQuantity = 1,
				hrefCreated = '';

			if (addToCartLink.length && productId) {
				if (inputVal > 1) {
					productQuantity = inputVal;
				}

				hrefCreated = '?add-to-cart=' + productId + '&quantity=' + productQuantity;

				addToCartLink.attr('href', hrefCreated);
			}

		};

		floatToWcPrice						= function ( price ){

			var default_args = {
				decimal_sep: yith_wapo.decimal_sep,
				currency_position: yith_wapo.currency_position,
				currency_symbol: yith_wapo.currency_symbol,
				trim_zeros: yith_wapo.total_thousand_sep,
				num_decimals: parseInt(yith_wapo.number_decimals),
				html: true
			};

			if (default_args.num_decimals > 0) {
				var wc_price_length = parseInt(price).toString().length;
				var wc_int_end_sep = parseInt(wc_price_length) + parseInt(default_args.num_decimals);
				price = price.toString().substr(0, wc_int_end_sep + 1);
				price = parseFloat(price).toFixed(2);
			} else {
				price = parseInt(price);
			}

			price = price.toString().replace('.', default_args.decimal_sep).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1' + default_args.trim_zeros );

			var formatted_price = price;
			var formatted_symbol = default_args.html ? '<span class="woocommerce-Price-currencySymbol">' + default_args.currency_symbol + '</span>' : default_args.currency_symbol;
			if ('left' === default_args.currency_position) {
				formatted_price = formatted_symbol + formatted_price;
			} else if ('right' === default_args.currency_position) {
				formatted_price = formatted_price + formatted_symbol;
			} else if ('left_space' === default_args.currency_position) {
				formatted_price = formatted_symbol + ' ' + formatted_price;
			} else if ('right_space' === default_args.currency_position) {
				formatted_price = formatted_price + ' ' + formatted_symbol;
			}
			formatted_price = default_args.html ? '<span class="woocommerce-Price-amount amount">' + formatted_price + '</span>' : formatted_price;

			return formatted_price;

		}

		wcPriceToFloat 					= function (wc_price) {
			let price = wc_price.replace(/(?![\.\,])\D/g, '')
				.replace(yith_wapo.total_thousand_sep, '')
				.replace(yith_wapo.decimal_sep, '.');

			return parseFloat(price);
		},
			getDefaultProductPrice 			= function () {
				if ( yith_wapo.enableGetDefaultVariationPrice ) {
					let product_id = $( '.variations_form.cart' ).data( 'product_id' );
					let data = {
						'action' : 'get_default_variation_price',
						'product_id' : parseInt( product_id ),
						'security'  : yith_wapo.addons_nonce,
					};
					$.ajax(
						{
							url : yith_wapo.ajaxurl,
							type : 'post',
							data : data,
							success : function( response ) {
								if ( response ) {
									let defaultProductPrice = response['price_html'];
									let container = $( wapoDOM.addonsContainer );
									container.attr( 'data-product-price', response['current_price'] );
									container.attr( 'data-product-id', product_id );

									if ( 'yes' === yith_wapo.replace_product_price && container.find('.yith-wapo-block').length ) {
										$( yith_wapo.replace_product_price_class ).html( defaultProductPrice );
									}

								}
							},
							complete: function (){
							}
						}
					);
				}
			},

			checkSelectorsOnLoad 		= function() {

				let checkedOptionsByDefault = $( '.yith-wapo-addon.yith-wapo-addon-type-select select option:checked' );

				$( checkedOptionsByDefault ).each(function() {
					let select = $( this ).closest( 'select' );
					selectOnChange( select );
				});


			},

			/**
			 * Check the default options selected on load page to replace the image.
			 */
			checkDefaultOptionsOnLoad 	= function () {
				let optionsSelected = $('.yith-wapo-addon:not(.conditional_logic):not(.hidden) .yith-wapo-option.selected');
				$(optionsSelected).each(
					function () {
						let option = $(this);
						replaceImageAction(option);
					}
				);
			},

			resetAddons 			= function (event, params) {

				if ('yith_wccl' === params) {
					return;
				}

				if (!firstVariationLoading) {
					firstVariationLoading = true;
					return;
				}

				getDefaultProductPrice();

				$(document).trigger('yith-wapo-reset-addons');

			},

			foundVariation = function (event, variation) {
				// Skip found_variation in Composite products or YITH Color and Label loop form
				if (event.target.classList.value === 'variations_form cart in_loop initialized' || $('form.cart.ywcp').length) return;

				updateContainerProductPrice(variation);

				$(document).trigger('yith-wapo-reload-addons');
			},

			reloadAddons 			= function (event, productPrice = '') {
				var addons = $(wapoDOM.formCart).serializeArray(),
					data = {
						'action'          : 'live_print_blocks',
						'addons'          : addons,
						'currency'        : yith_wapo.woocommerce_currency,
						'current_language': yith_wapo.currentLanguage,
						'security'        : yith_wapo.addons_nonce,
					};

				if (productPrice != '') {
					data.price = productPrice;
				}

				$.ajax(
					{
						url: yith_wapo.ajaxurl,
						type: 'post',
						data: data,
						beforeSend: function () {
							$(wapoDOM.addonsContainer).css('opacity', '0.5');
						},
						error: function (xhr, status, error) {
							// Code to handle errors.
							console.error('AJAX request failed: ', status, error);
						},
						success: function (response) {
							let html = response['html'] ?? '';
							var quantities = response['quantities'] ?? '';

							if (html !== '') {
								$(wapoDOM.addonsContainer).html(html);
							}

							let addonsSelected = response['addons'] ?? '';
							if (addonsSelected !== '') {
								addonsSelection(addonsSelected);
							}
							if (quantities) {
								addonsQuantity(quantities);
							}

							$( 'form.cart #yith-wapo-container select' ).trigger('change');

							$('form.cart').trigger('yith-wapo-after-reload-addons');

						},
						complete: function (event) {

							$(wapoDOM.addonsContainer).attr('data-order-price', 0);
							calculateTotalAddonsPrice();

							$(wapoDOM.addonsContainer).css('opacity', '1');

						}
					}
				);
			},

			addonsQuantity 				= function (quantities) {

				$.each($(wapoDOM.addonsContainer).find('.qty.wapo-product-qty'), function () {
					let separator = 'yith_wapo_product_qty';
					let qtyID = $(this).attr('id');
					let identificator = qtyID.replace(separator, '').replace('[', '').replace(']', '');

					if (identificator in quantities) {
						let qty = quantities[identificator];
						$(this).val(qty);
					}
				});

			},

			setQuantity 				= function (quantity) {
				$( 'div.quantity input.input-text.qty ' ).val( quantity );
			}

		removeUploadedFile 			= function (ev) {
			let element               = ev.target,
				uploadedFileContainer = $(element).closest('.yith-wapo-uploaded-file-element'),
				maxMultiple           = $(element).closest('.yith-wapo-option').data('max-multiple'),
				lengthUploads         = $(element).closest('.yith-wapo-ajax-uploader').find('.yith-wapo-uploaded-file-element').length,
				uploaderContainer     = $(element).closest('.yith-wapo-ajax-uploader').find('.yith-wapo-ajax-uploader-container'),
				parentInputHidden     = $(element).closest('.yith-wapo-option').find('input[type="hidden"].upload-parent'),
				fileInput             = $(element).closest('.yith-wapo-option').find('input[type="file"]');

			uploadedFileContainer.remove();

			fileInput.val('');

			if ('undefined' === typeof maxMultiple || lengthUploads - 1 < maxMultiple) { // If max is not defined or length is less than max, show the Upload button.
				uploaderContainer.fadeIn();
			}
			if (lengthUploads - 1 <= 0) {
				parentInputHidden.val('');
				calculateTotalAddonsPrice();
			}

		},

			maybeCalculateTotals 			= function(addonOpt) {

				let isQuantityButton = false;
				if (addonOpt.is('input[type="number"]')) {
					isQuantityButton = addonOpt.attr('name').indexOf('yith_wapo_product_qty') == 0 && addonOpt.hasClass('qty') || // Is quantity field from add-on type Product.
					'quantity' === addonOpt.attr('name') && addonOpt.hasClass('qty') // Is WooCommerce quantity field.
						? true : false;
				}

				let selectOpt = '';
				if (addonOpt.is('select')) {
					selectOpt = addonOpt.closest('.yith-wapo-addon.yith-wapo-addon-type-select');
				}

				// Has price or is the WC Qty Button or is a Select add-on (selector is unique).
				if (addonOptHasPrice(addonOpt) || isQuantityButton || (selectOpt && 'select' === selectOpt.data('addon-type'))) {
					calculateTotalAddonsPrice();
				}
			},

			addonOptHasPrice 			= function(addonOpt = null) {

				let price = getOptionPrice(addonOpt),
					sale_price = getOptionSalePrice(addonOpt);

				if ((typeof price === 'undefined' || '' === price) && (typeof sale_price === 'undefined' || '' === sale_price)) {
					return false;
				}

				return true;
			},

			/** Get price of an option */
			getOptionPrice 				= function(addonOpt) {

				let price = addonOpt.data('price');

				return price;

			},

			/** Get sale price of an option */
			getOptionSalePrice 			= function(addonOpt) {

				let price = addonOpt.data('sale-price');

				return price;

			},

			/**
			 * Check min and max values for the sum of add-ons type Number.
			 */
			checkNumbersTotalValues 	 = function () {

				var numberAddons = $('#yith-wapo-container .yith-wapo-addon-type-number:not(.hidden).numbers-check'),
					isError = false;

				numberAddons.each(function (index) {

					let numberAddon = $(this),
						numberMin = numberAddon.data('numbers-min'),
						numberMax = numberAddon.data('numbers-max'),
						totalCount = 0,
						errorCheck = false,
						errorMessage = '',
						optionsElement = numberAddon.find('.options');

					// Reset
					if (optionsElement.hasClass('error-message')) {
						optionsElement.removeClass('error-message');
					}
					numberAddon.find('.yith-wapo-numbers-error-message').remove();

					numberAddon.find('input[type="number"]').each(function () {
						let number = $(this).val();
						if ('undefined' === number || '' === number) {
							return true; // continue
						}
						totalCount += parseFloat(number);
					});

					if ('undefined' !== typeof numberMin && totalCount < numberMin) {
						errorCheck = true;
						errorMessage = yith_wapo.messages.minErrorMessage + ' ' + numberMin;
					}
					;

					if ('undefined' !== typeof numberMax && totalCount > numberMax) {
						errorCheck = true;
						errorMessage = yith_wapo.messages.maxErrorMessage + ' ' + numberMax;
					}
					;

					if (errorCheck) {
						optionsElement.addClass('error-message');
						numberAddon.append($('<small class="yith-wapo-numbers-error-message">' + errorMessage + '</small>'));
						isError = true;
						$('html, body').animate({scrollTop: numberAddon.offset().top - 50}, 500);
					}

				});

				$(document).trigger('yith_wapo_check_number_total_values');

				if (isError) {
					return false;
				}

				return true;

			};

		replaceImageAction 			= function( optionWrapper, reset = false ) {

			var defaultPath     = yith_wapo.replace_image_path;
			var zoomMagnifier   = '.yith_magnifier_zoom_magnifier, .zoomWindowContainer .zoomWindow';
			var replaceImageURL = optionWrapper.data( 'replace-image' );

			if ( null === replaceImageURL || ! reset && $( defaultPath ).attr( 'src' ) === replaceImageURL ) {
				return;
			}

			if ( typeof optionWrapper.data( 'replace-image' ) !== 'undefined' && optionWrapper.data( 'replace-image' ) != '' ) {

				// save original image for the reset
				if ( typeof( $( defaultPath ).attr( 'wapo-original-img' ) ) == 'undefined' ) {
					$( defaultPath ).attr( 'wapo-original-img', $( defaultPath ).attr( 'src' ) );
					if ( $( zoomMagnifier ).length ) {
						$( zoomMagnifier ).attr( 'wapo-original-img', $( zoomMagnifier ).css( 'background-image' ).slice( 4, -1 ).replace( /"/g, "" ) );
					}
				}

				$( wapoDOM.addonImageInput ).val( replaceImageURL );

				$( zoomMagnifier ).css( 'background-image', 'url(' + replaceImageURL + ')' );

				replaceAddonImage( replaceImageURL );

			}

			if ( reset && typeof( $( defaultPath ).attr( 'wapo-original-img' ) ) != 'undefined' ) {

				var originalImage = $( defaultPath ).attr( 'wapo-original-img' );
				var originalZoom  = $( zoomMagnifier ).attr( 'wapo-original-img' );

				var currentImage = $( wapoDOM.addonImageInput ).val();

				$( wapoDOM.addonImageInput ).val( '' );

				$( wapoDOM.addonsContainer ).find( '.yith-wapo-addon:not(.yith-wapo-addon-type-select):not(.conditional_logic.hidden) .yith-wapo-option.selected, .yith-wapo-addon-type-select:not(.conditional_logic.hidden) .yith-wapo-option-value' ).each(
					function( index, element ) {
						let option = $( element );
						option = option.is( 'select' ) ? option.find( ':selected' ) : option;
						// Check if one option is still selected and has a image to replace, then do not change to default image.
						if ( option.data( 'replace-image' ) && ( option.hasClass( 'selected' ) || option.is( 'option' ) ) ) {
							originalImage = option.data( 'replace-image' );
							$( wapoDOM.addonImageInput ).val( originalImage );
						}
					}
				);

				if ( currentImage === originalImage ) { // If the replaced image is the same, we stop the execution.
					return;
				}

				$( zoomMagnifier ).css( 'background-image', 'url(' + originalZoom + ')' );

				replaceAddonImage( originalImage );

			}
		}


		checkMaxSelected 			= function (element) {

			var option = element.closest('.yith-wapo-option'),
				addon = element.closest('.yith-wapo-addon'),
				maxVal = addon.data('max'),
				optionsSelected = addon.find('.yith-wapo-option.selected').length;

			if ('' === maxVal || 0 === maxVal) {
				return true;
			}

			if (option.hasClass('selected')) {
				optionsSelected--;
			} else {
				optionsSelected++;
			}

			if (optionsSelected > maxVal) {
				return false;
			}

			return true;

		},

		addonImageClicked = function () {
			var addon  = $(this).closest( '.yith-wapo-addon' );
			if ( 'label' === addon.data( 'addon-type' ) ) {
				return;
			}
			var option = $(this).closest( '.yith-wapo-option' );

			option.find( "input[name^='yith_wapo']" ).click();
		},

		checkboxOnChange				= function() {
			let checkboxInput   = $( this );
			let checkboxButton  = checkboxInput.closest( '.checkboxbutton' );
			let checkboxOption  = checkboxInput.closest( '.yith-wapo-option' );
			let checkboxOptions = checkboxOption.parent();

			let resetImage      = false;

			if ( checkboxOption.data( 'replace-image' ).length <= 0 ) {
				resetImage = true;
			}

			let isChecked = checkboxInput.attr( 'checked' );

			if ( 'checked' !== isChecked ) {

				// Single selection
				if ( checkboxOption.hasClass( 'selection-single' ) ) {
					// Disable all.
					checkboxOptions.find( 'input' ).attr( 'checked', false ).prop( 'checked', false );;
					checkboxOptions.find( '.selected, .checked' ).removeClass( 'selected checked' );
				}

				// Enable only the current option.
				checkboxInput.attr( 'checked', true ).prop( 'checked', true );
				checkboxOption.addClass( 'selected' );
				checkboxButton.addClass( 'checked' );

			} else {
				checkboxInput.attr( 'checked', false ).prop( 'checked', false );
				checkboxOption.removeClass( 'selected' );
				checkboxButton.removeClass( 'checked' );

				resetImage = true;
			}

			replaceImageAction( checkboxOption, resetImage );

		}

		inputOnChange				= function() {

			var input = $(this);
			var option = input.closest( '.yith-wapo-option' );
			var disabled = false;

			// Selection type single or multiple.

			if ( '' !== input.val() && option.hasClass( 'selection-single' ) ) {
				disabled = true;
				option.siblings().find( 'input' ).prop( 'disabled', true );
			}

			option.siblings().find( 'input' ).prop( 'disabled', disabled );

		}

		textareaOnChange				= function() {

			var input = $(this);
			var option = input.closest( '.yith-wapo-option' );
			var disabled = false;

			// Selection type single or multiple.

			if ( '' !== input.val() && option.hasClass( 'selection-single' ) ) {
				disabled = true;
				option.siblings().find( 'textarea' ).prop( 'disabled', true );
			}

			option.siblings().find( 'textarea' ).prop( 'disabled', disabled );

		}

		labelsOnChange 				= function() {
			let reset = false;
			/**
			 * Check max value available.
			 * @type {boolean}
			 */
			var maxSelected = checkMaxSelected($(this));

			if (!maxSelected) {
				$(this).prop('checked', false);
				return false;
			}

			var optionWrapper = $(this).closest('.yith-wapo-option');

			if ( optionWrapper.data( 'replace-image' ).length <= 0 ) {
				reset = true;
			}

			if ($(this).is(':checked')) {


				// Single selection
				if (optionWrapper.hasClass('selection-single')) {
					// Disable all
					optionWrapper.parent().find('input').prop('checked', false);
					optionWrapper.parent().find('.selected').removeClass('selected');
				}
				optionWrapper.addClass('selected');
				// Check checkbox of selected one.
				optionWrapper.find('input').prop('checked', true);

			} else {
				reset = true;
				optionWrapper.removeClass('selected');
			}

			// Replace image
			replaceImageAction(optionWrapper, reset);

		}

		colorOnChange 			= function() {
			let reset = false;
			var optionWrapper = $(this).closest('.yith-wapo-option');

			if ( optionWrapper.data( 'replace-image' ).length <= 0 ) {
				reset = true;
			}

			if ( $( this ).is( ':checked' ) ) {
				optionWrapper.addClass( 'selected' );

				// Single selection
				if ( optionWrapper.hasClass( 'selection-single' ) ) {
					// Disable all
					optionWrapper.parent().find( 'input' ).prop( 'checked', false );
					optionWrapper.parent().find( '.selected' ).removeClass( 'selected' );
					// Enable only the current option
					optionWrapper.find( 'input' ).prop( 'checked', true );
					optionWrapper.addClass( 'selected' );
				}

			} else {
				reset = true;
				optionWrapper.removeClass( 'selected' );
			}
			// Reset image.
			replaceImageAction( optionWrapper, reset );

		},
			productOnChange 		= function() {

				var optionWrapper = $(this).closest('.yith-wapo-option');

				if ( $( this ).is( ':checked' ) ) {

					optionWrapper.addClass( 'selected' );

					// Single selection.
					if ( optionWrapper.hasClass( 'selection-single' ) ) {
						// Disable all.
						optionWrapper.parent().find( 'input' ).prop( 'checked', false );
						optionWrapper.parent().find( '.selected' ).removeClass( 'selected' );
						// Enable only the current option.
						optionWrapper.find( 'input' ).prop( 'checked', true );
						optionWrapper.addClass( 'selected' );
					}

				} else {
					optionWrapper.removeClass( 'selected' );
				}

			},

			radioOnChange			= function() {
				let reset = false;
				var optionWrapper = $(this).closest('.yith-wapo-option');

				if ( optionWrapper.data( 'replace-image' ).length <= 0 ) {
					reset = true;
				}

				optionWrapper.addClass( 'selected' );

				// Remove selected siblings
				optionWrapper.siblings().removeClass( 'selected' );

				// Replace image
				replaceImageAction( optionWrapper, reset );

			},

			selectOnChange			= function(selector) {

				var selector = (typeof selector !== "undefined" && selector instanceof jQuery) ? selector : $(this);

				let optionWrapper    = selector.closest( '.yith-wapo-addon' );
				let selectedOption   = selector.find( 'option:selected' );
				let optionImageBlock = optionWrapper.find( 'div.option-image' );
				let resetImage 		 = false;

				// Description & Image.
				var optionImage       = selectedOption.data( 'image' );
				var optionDescription = selectedOption.data( 'description' );
				var option_desc       = optionWrapper.find( 'p.option-description' );

				if ( typeof optionImage !== 'undefined' && optionImage ) {
					optionImage = '<img src="' + optionImage + '" style="max-width: 100%">';
					optionImageBlock.html( optionImage );
				}

				if ( 'default' === selectedOption.val() || '' === optionImage ) {
					optionImageBlock.hide();
				} else {
					optionImageBlock.fadeIn();
				}

				if ( 'undefined' === typeof optionDescription ) {
					option_desc.empty();
				} else {
					option_desc.html( optionDescription );
				}

				// Replace image
				if ( ! selectedOption.data( 'replace-image' ) ){
					resetImage = true;
				}

				replaceImageAction( selectedOption, resetImage );

			},

			fileOnChange = function (e) {
				$(this).closest('.yith-wapo-ajax-uploader').css('opacity', '1');

				var input = $(this),
					uploaderElement = input.closest('.yith-wapo-option').find('.yith-wapo-ajax-uploader'),
					fileList = input[0].files,
					correctFiles = checkBeforeUploadFiles(uploaderElement, fileList); //Boolean

				if (correctFiles) {
					uploadFiles(fileList, uploaderElement);
				}
			}

		toggleElement 		= function (e) {
			e.preventDefault();
			let addon_title = $(this).find('.wapo-addon-title');
			let addon_el = addon_title.closest('.yith-wapo-addon');

			if (addon_el.hasClass('toggle-open')) {
				addon_el.removeClass('toggle-open').addClass('toggle-closed');
			} else {
				addon_el.removeClass('toggle-closed').addClass('toggle-open');
			}
			if (addon_title.hasClass('toggle-open')) {
				addon_title.removeClass('toggle-open').addClass('toggle-closed');
			} else {
				addon_title.removeClass('toggle-closed').addClass('toggle-open');
			}

			addon_el.find('.options-container').toggle('fast');

			$(document).trigger('yith_proteo_inizialize_html_elements');
		},

			updateContainerProductPrice = function (variation) {

				// Do not allow updating the price if product bundle form exists.
				if ($('.cart.yith-wcpb-bundle-form').length || variation.variation_id !== parseInt($('.variation_id').val())) {
					return;
				}

				let container = $(wapoDOM.addonsContainer),
					new_product_price = 0;
				if (typeof (variation.display_price) !== 'undefined') {
					new_product_price = variation.display_price;
					// Check if variation price and price_html are different, use the last one
					if ('yes' === yith_wapo.use_price_html_on_variations && typeof (variation.price_html) !== 'undefined') {
						let new_product_price_html = $(variation.price_html).find('> .amount bdi').text();
						new_product_price_html = wcPriceToFloat(new_product_price_html);
						if (!isNaN(new_product_price_html) && new_product_price !== new_product_price_html) {
							new_product_price = new_product_price_html;
						}
					}
				}
				container.attr('data-product-price', new_product_price);
				container.attr( 'data-default-product-price', variation.default_variation_price);
				container.attr('data-product-id', variation.variation_id);

			},

			yithWcMeasurementPC_Compatibility = function() {
				var price = $( '#price_calculator.wc-measurement-price-calculator-price-table .product_price .amount' ).text();
				price     = wcPriceToFloat( price );

				if ( ! isNaN( price ) ) {
					let container = $( wapoDOM.addonsContainer );

					container.attr( 'data-product-price', price );
					$( document ).trigger( 'yith-wapo-reload-addons', [ price ] );
				}
			},
			ajaxUploaderOnDrop 		= function (e) {
				e.stopPropagation();
				e.preventDefault();

				$(this).css('opacity', '1');

				var input = $(this).closest('.yith-wapo-option').find('input.file'),
					uploaderElement = $(this),
					fileList = e.originalEvent.dataTransfer.files,
					correctFiles = checkBeforeUploadFiles(uploaderElement, fileList); //Boolean

				if (correctFiles) {
					uploadFiles(fileList, uploaderElement);
				}
			},
			checkBeforeUploadFiles 	= function (uploaderElement, fileList) {
				let countAlreadyUploaded = $(uploaderElement).find('.yith-wapo-uploaded-file-element').length,
					totalUploads = countAlreadyUploaded + fileList.length,
					maxUploadsAllowed = $(uploaderElement).closest('.yith-wapo-option').data('max-multiple'),
					allowMultiple = $(uploaderElement).closest('.yith-wapo-option').hasClass('allow-multiple');

				if (!allowMultiple && totalUploads > 1) {
					alert(yith_wapo.messages.maxFilesAllowed + '1');
					return false;
				}

				if ('undefined' !== typeof maxUploadsAllowed && totalUploads > maxUploadsAllowed) {
					alert(yith_wapo.messages.maxFilesAllowed + maxUploadsAllowed);
					return false;
				}

				for (var item in fileList) {
					if ($.isNumeric(item)) {

						let file = fileList[item],
							message = '',
							isError = false;

						if (!yith_wapo.upload_allowed_file_types.includes(file.name.split('.').pop().toLowerCase())) {
							//message = 'Error - not supported extension!';
							message = yith_wapo.messages.noSupportedExtension;
							isError = true;
						}

						if (parseFloat(file.size) >= parseFloat(yith_wapo.upload_max_file_size * 1024 * 1024)) {
							//message = 'Error - file size for ' + file.name + ' - max ' + yith_wapo.upload_max_file_size + ' MB allowed!';
							message = wapoSprintf(yith_wapo.messages.maxFileSize, file.name, yith_wapo.upload_max_file_size);
							isError = true;
						}

						if (isError) {
							alert(message);
							return false;
						}

					}
				}

				return true;
			},

			wapoSprintf 		= function (format, ...values) {
				return format.replace(/%([sd])/g, function (match, tipo) {
					if (tipo === 's') {
						return values.shift();
					} else if (tipo === 'd') {
						const valor = values.shift();
						return Number.isInteger(valor) ? valor.toString() : '';
					}
					return match;
				});
			},

			uploadFiles 		= function (fileList, uploaderElement) {

				for (var count = 0; count < fileList.length; count++) {
					let uploadedFileContainer = uploaderElement.find('.yith-wapo-uploaded-file'),
						currentIndex = uploaderElement.find('.yith-wapo-uploaded-file-element').last().data('index') + 1;
					if (isNaN(currentIndex) || 'undefined' == typeof currentIndex) {
						currentIndex = 0;
					}
					appendNewUploadedFile(count, fileList, uploadedFileContainer, currentIndex);

					if (count == fileList.length - 1) {
						uploadedFileContainer.show();

						uploadSingleFile(fileList, 0, uploaderElement);
					}
				}

			},
			appendNewUploadedFile 	= function ( count, fileList, uploadedFileContainer, currentIndex ) {
				let exactSize = calculateExactFileSize( fileList[count] ),
					fileName = fileList[count].name,
					optionId = $( uploadedFileContainer ).closest( '.yith-wapo-option' ).data( 'option-id' );

				var newElement =
					'<div class="yith-wapo-uploaded-file-element uploaded-file-'+currentIndex+'" data-index="' + currentIndex + '">' +
					'<div class="yith-wapo-uploaded-file-info">' +
					'<span class="info">' +
					'<label class="file-name"><span>' + fileName + '</span></label>' +
					'<span class="file-size">' + exactSize + '</span>' +
					'</span>' +
					'<i class="remove yith-plugin-fw__action-button__icon yith-icon yith-icon-trash" style="display:none"></i>' +
					'</div>' +
					'<div class="yith-wapo-loader-container" id="progressbar'+currentIndex+'">' +
					'<div class="yith-wapo-loader-label"></div>' +
					'<div class="yith-wapo-loader" role="progressbar"></div>' +
					'</div>' +
					'<input type="hidden" id="yith-wapo-' + optionId + '" class="option yith-wapo-option-value" name="yith_wapo[][' + optionId + '][]" >' +
					'</div>';

				uploadedFileContainer.append( newElement );
			},
			uploadSingleFile 		= function (fileList, fileCount, uploaderElement, isFinalUpload = false, currentIndex = 0) {

				if (0 === parseInt(currentIndex) && $(uploaderElement).find('.yith-wapo-uploaded-file-element.completed').length) {
					currentIndex = $(uploaderElement).find('.yith-wapo-uploaded-file-element.completed').last().data('index') + 1;
				}

				var fileLength = fileList.length - 1,
					currentFile = fileList[fileCount],
					data = new FormData(),
					option = $(uploaderElement).closest('.yith-wapo-option'),
					maxMultiple = option.data('max-multiple'),
					uploadedFileContainer = $(uploaderElement).find('.yith-wapo-uploaded-file'),
					uploaderContainer = $(uploaderElement).find('.yith-wapo-ajax-uploader-container'),
					uploadedFileElement = $(uploaderElement).find('.yith-wapo-uploaded-file-element[data-index="' + currentIndex + '"]'),
					removeIcon = $(uploaderElement).find('.yith-wapo-uploaded-file-info .remove'),
					progressLabel = $(uploadedFileElement).find('.yith-wapo-loader-container .yith-wapo-loader-label'),
					progressbar = $(uploadedFileElement).find('.yith-wapo-loader-container .yith-wapo-loader');

				data.append('action', 'yith_wapo_upload_file');
				data.append( 'security', yith_wapo.addons_nonce);
				data.append('currentFile', currentFile);

				$.ajax(
					{
						url: yith_wapo.ajaxurl,
						type: 'POST',
						contentType: false,
						processData: false,
						async: true,
						dataType: 'json',
						data: data,
						xhr: function () {
							var xhr = $.ajaxSettings.xhr();
							if (xhr.upload) {
								xhr.upload.addEventListener('progress', function (event) {
									var currentPercent = 0;
									if (event.lengthComputable) {
										currentPercent = Math.ceil(event.loaded / event.total * 100);
									}
									progressbar.progressbar({
										value: currentPercent,
									});

								}, false);
								xhr.addEventListener("progress", function (e) {
									if (fileList.length == 1 || isFinalUpload) {
										if (option.hasClass('allow-multiple')) {
											let countUploadedFiles = $(uploaderElement).find('.yith-wapo-uploaded-file-element').length;
											if ('undefined' === typeof maxMultiple || 'undefined' !== typeof maxMultiple && countUploadedFiles < maxMultiple) {
												uploaderContainer.fadeIn();
											}
										}

										removeIcon.fadeIn();
										let parentInputHidden = $(uploaderElement).closest('.yith-wapo-option').find('input[type="hidden"].upload-parent');
										parentInputHidden.val(1);

										//Calculate prices after all the uploads.
										calculateTotalAddonsPrice();

									}
								}, false);
								return xhr;
							}
							return xhr;
						},
						beforeSend: function () {
							uploaderContainer.hide();
							uploadedFileContainer.show();

							progressbar.progressbar({
								change: function () {
									progressLabel.text(progressbar.progressbar('value') + "%" + ' ' + yith_wapo.i18n.uploadPercentageDoneString);
								},
								complete: function (e) {
									$(e.target).closest('.yith-wapo-loader-container').fadeOut();
								}
							});
							progressbar.show();
							$('.cart').block({message: null, overlayCSS: {opacity: 0}});

						},
						success: function (res, status) {
							if (status == 'success') {


								let hiddenElement = uploadedFileElement.find('input[type="hidden"]'),
									infoElement = uploadedFileElement.find('.yith-wapo-uploaded-file-info span.info'),
									resType = res.type;


								hiddenElement.val(res.url); // Add the value to the hidden input for $_POST['yith_wapo']

								if ('image/jpeg' === resType || 'image/jpg' === resType || 'image/png' === resType || 'image/gif' === resType || 'image/svg+xml' === resType) {
									infoElement.append('<img src="' + res.url + '" class="yith-wapo-img-uploaded" alt="Image uploaded from YITH Product Add-ons uploader">').fadeIn(); // Show the image preview.
								}

								if (fileCount < fileLength) {
									if (fileCount == fileLength - 1) {
										isFinalUpload = true;
									}
									uploadSingleFile(fileList, fileCount + 1, uploaderElement, isFinalUpload, currentIndex + 1);
								}
							}
						},
						complete: function () {
							$(uploadedFileElement).addClass('completed');
							console.log('Single file upload completed!');
							$('.cart').unblock({message: null});
						},
						error: function (res) {
							console.log('File upload failed!');
							$('.cart').unblock({message: null});
						},

					});

			},
			calculateExactFileSize 		= function( file ) {
				let exactSize  = 0;
				let file_size  = file.size;
				let file_types = ['Bytes', 'KB', 'MB', 'GB'],
					i              = 0;
				while ( file_size > 900 ) {
					file_size /= 1024;
					i++;
				}
				exactSize = ( Math.round( file_size * 100 ) / 100 ) + ' ' + file_types[i];

				return exactSize;
			},
			checkRequiredMinMax 		= function (action = '') {

				let canProceed = true;

				// Check force user selection for add-on type Select.
				if (!checkRequiredSelect(action)) {
					canProceed = false;
				}
				if (!checkTextInputLimit()) {
					canProceed = false;
				}

				// Required feature.
				if (action !== 'hide') {

					let required = checkRequiredFields('highlight');
					if (!required) {
						canProceed = false;
					}
				}
				var requiredOptions = 0;
				var checkMinMaxVal = '';
				var apply_submit = action !== 'hide';
				$('form.cart .yith-wapo-addon:not(.hidden)').each(
					function () {
						checkMinMaxVal = checkMinMax($(this), apply_submit);
						if (checkMinMaxVal > 0) {
							requiredOptions += checkMinMaxVal;
						}
					}
				);
				if (action !== 'hide') {
					if (requiredOptions > 0) {
						canProceed = false;
					}
				}

				return canProceed;
			},
			/**
			 * Check min/max for each option
			 * @param addon
			 * @param submit
			 * @returns {number}
			 */
			checkMinMax 		= function(addon, submit = false) {

				var addonType = addon.data('addon-type');
				var minValue = addon.data('min');
				var maxValue = addon.data('max');
				var exaValue = addon.data('exa');
				var errorMessage = addon.find('.min-error-message'),
					addonTitle = addon.find('.wapo-addon-title'),
					numberOfChecked = 0;

				let toggle_addon_title = addon.find('.wapo-addon-title.toggle-closed');
				addonTitle.removeClass('wapo-error');

				if ('select' === addonType || ('' === minValue && '' === exaValue && '' === maxValue)) {
					return;
				}

				// Number / Text / TextArea
				if ('number' === addonType || 'text' === addonType || 'textarea' === addonType) {
					$(addon).find('.yith-wapo-option-value').each(
						function (index) {
							let numberValue = $(this).val();
							if (numberValue.length) {
								numberOfChecked++; // Summing number of filled.
							}
						}
					);

					if (maxValue && numberOfChecked > maxValue) {
						let optionsElement = $(addon).find('.options-container');
						if (!optionsElement.find('.max-selected-error').length) {
							optionsElement.append('<p class="max-selected-error">' + yith_wapo.i18n.maxOptionsSelectedMessage + '</p>');
							addonTitle.addClass('wapo-error');
						}
						return 1;
					}

				} else if ( 'file' === addonType ) {
					numberOfChecked = $(addon).find( '.yith-wapo-uploaded-file' ).has('.yith-wapo-uploaded-file-element').length;
				} else {
					// Checkbox / Radio
					numberOfChecked = addon.find('input:checkbox:checked, input:radio:checked').length; // Sum of number of checked.
				}

				// Exactly Values
				if (exaValue > 0) {

					let optionsToSelect = 0;

					if (exaValue == numberOfChecked) {
						addon.removeClass('required-min').find('.min-error').hide();
						addon.find('input:checkbox').not(':checked');
					} else {
						// If click on add to cart button.
						if (submit) {
							optionsToSelect = exaValue - numberOfChecked;
							addon.addClass('required-min');
							addon.find('.min-error').show();
							addonTitle.addClass('wapo-error');

							let errorMessageText = yith_wapo.i18n.selectOptions.replace('%d', exaValue)
							if (1 === exaValue) {
								errorMessageText = yith_wapo.i18n.selectAnOption;
							}

							errorMessage.text(errorMessageText);

							if (toggle_addon_title) {
								toggle_addon_title.click();
							}
						}
						addon.find('.yith-wapo-option:not(.out-of-stock) input:checkbox').not(':checked').attr('disabled', false);
					}

					return Math.abs( optionsToSelect );

				} else {

					// At least values.
					if (minValue > 0) {
						let optionsToSelect = minValue - numberOfChecked;
						if (minValue <= numberOfChecked) {
							addon.removeClass('required-min').find('.min-error').hide();
						} else {
							// If click on add to cart button.
							if (submit) {
								let minMessage = yith_wapo.i18n.selectAnOption;
								if (minValue > 1) {
									minMessage = yith_wapo.i18n.selectAtLeast.replace('%d', minValue)
								}

								addon.addClass('required-min');
								addon.find('.min-error').show();
								addonTitle.addClass('wapo-error');
								errorMessage.text(minMessage);

								if (toggle_addon_title) {
									toggle_addon_title.click();
								}
							}
							return optionsToSelect;
						}
					}

					// Max values.
					if (!maxValue || maxValue >= numberOfChecked) {
						addon.removeClass('required-min').find('.max-selected-error').hide();
					} else {
						// If click on add to cart button.
						if (submit) {
							addon.addClass('required-min');
							let optionsElement = $(addon).find('.options-container');
							if (!optionsElement.find('.max-selected-error').length) {
								optionsElement.append('<small class="max-selected-error">' + yith_wapo.i18n.maxOptionsSelectedMessage + '</small>');
								addonTitle.addClass('wapo-error');
							}
						}
						return 1;
					}

				}
			},
			/** Check force user select an option for add-on type Selector */
			checkRequiredSelect 		= function (action = '') {

				let value = true;

				$('.yith-wapo-addon.yith-wapo-addon-type-select select').each(
					function () {
						let currentSelect = $(this);
						if (currentSelect.is(':required')) {
							let addon = currentSelect.closest('.yith-wapo-addon');
							let errorMessage = addon.find('.min-error-message'),
								addonTitle = addon.find('.wapo-addon-title');
							let selectValue = currentSelect.val();
							errorMessage.text('');
							addonTitle.removeClass('wapo-error');
							addon.removeClass('required-min');

							if ('default' === selectValue && !addon.hasClass('hidden')) {
								value = false;
								if (!value && 'hide' !== action) {
									let error_el = addon.find('.min-error');
									let toggle_addon = currentSelect.closest('div.yith-wapo-addon.wapo-toggle');
									let toggle_addon_title = toggle_addon.find('.wapo-addon-title.toggle-closed');
									addon.addClass('required-min');

									if (toggle_addon_title) {
										toggle_addon_title.click();
									}
									addonTitle.addClass('wapo-error');
									errorMessage.text(yith_wapo.i18n.selectAnOption.replace('%d', 1));
									error_el.show();
								}
							}
						}
					}
				);

				return value;
			},
			checkTextInputLimit		 = function () {
				let valid = true;
				$('form.cart .yith-wapo-addon.yith-wapo-addon-type-text:not(.hidden) input').each((index, input) => {
					let currentInput = $(input),
						currentValue = currentInput.val(),
						minLength = currentInput.attr('minlength'),
						maxLength = currentInput.attr('maxlength');
					if ((minLength !== '' && currentValue.length < minLength) || (maxLength !== '' && currentValue.length > maxLength)) {
						currentInput.addClass('length-error');
						currentInput.siblings('.length-error-message').show();
						valid = false;
					} else {
						currentInput.siblings('.length-error-message').hide();
						currentInput.removeClass('length-error');
					}
				});

				return valid;
			},
			numberOnChange 			= function() {
				var inputElementValue = $(this).val(),
					optionWrapper = $(this).closest('.yith-wapo-option'),
					resetImage = false;

				if ('' == inputElementValue) {
					resetImage = true;
				}

				replaceImageAction(optionWrapper, resetImage);
				checkMultipliedPrice($(this));
			},
			checkMultipliedPrice 		= function (addon) {
				let price = addon.attr('data-price');
				let sale_price = addon.attr('data-price-sale');
				let defaultPrice = addon.attr('data-default-price');
				let priceType = addon.data('price-type');
				let priceMethod = addon.data('price-method');
				let default_attr = 'price';
				let final_price = 0;
				let addon_value = addon.val();

				if (!defaultPrice > 0) {
					if (sale_price > 0 && ('number' !== addon.attr('type') && 'multiplied' === priceType)) {
						price = sale_price;
						default_attr = 'price-sale';
					}
					defaultPrice = price;
					addon.data('default-price', defaultPrice);
				}
				if (priceMethod == 'value_x_product') {
					var productPrice = parseFloat($(wapoDOM.addonsContainer).attr('data-product-price'));
					final_price = addon_value * productPrice;
				} else if (priceType == 'multiplied') {
					final_price = addon_value * price;
				}

				if (final_price > 0 || priceMethod == 'decrease' || (final_price < 0 && priceType === 'multiplied')) {
					addon.data(default_attr, final_price);
				}
			},
			// Multiply add-on price by length
			checkMultipliedLength 		= function (addon) {

				let price = addon.data('price');
				let defaultPrice = addon.data('default-price');
				let priceType = addon.data('price-type');

				if (!defaultPrice > 0) {
					defaultPrice = price;
					addon.data('default-price', defaultPrice);
				}
				if ('characters' === priceType) {
					let remove_spaces = addon.data('remove-spaces');
					let addonLength = addon.val().length;
					if (remove_spaces) {
						addonLength = addon.val().replace(/\s+/g, '').length;
					}
					addon.data('price', addonLength * defaultPrice);
				}
			},
			productQtyOnKeyUp 			= function () {
				var productID = $(this).data('product-id');
				var productQTY = $(this).val();
				var productURL = '?add-to-cart=' + productID + '&quantity=' + productQTY;
				$(this).parent().find('a').attr('href', productURL);
			},

			datepickerSaveButton 		= function(ev) {
				ev.preventDefault();

				var elementToClick = $('#ui-datepicker-div .ui-state-active');

				if (0 == elementToClick.length) {
					elementToClick = $('#ui-datepicker-div .ui-datepicker-today');
				}

				elementToClick.click();
				$('.hasDatepicker').datepicker('hide');
			},
			datepickertimeOnChange 		= function(ev) {
				ev.preventDefault();
				var option_id = $('#ui-datepicker-div').attr('wapo-option-id');
				var tempTime = $('#' + option_id).closest('.date-container').find('.temp-time');

				tempTime.text($(this).val());
			}

		requestAQuoteButton 		= function (e) {
			e.preventDefault();

			if (typeof yith_wapo_general === 'undefined') {
				yith_wapo_general = {do_submit: true};
			}
			if (!checkRequiredMinMax()) {
				yith_wapo_general.do_submit = false;
			} else {
				yith_wapo_general.do_submit = true;
			}
		},

			compositePriceUpdated 		= function (event, total) {
				let global_qty = parseFloat($('form.cart.ywcp > div.quantity input.qty').val());
				let price = global_qty ? total / global_qty : total;
				let addonsContainer = $(wapoDOM.addonsContainer);

				addonsContainer.attr('data-product-price', price);
				calculateTotalAddonsPrice();
			},
			setError					= function ( option, message ) {
				option.find( '.yith-wapo-error' ).remove();
				let label = option.find( '.yith-wapo-addon-label' );

				label.addClass( 'wapo-error' );

				option.append( '<small class="yith-wapo-error">' + message + '</small>' );

			},
			cleanError					= function( option ) {
				let label = option.find( '.yith-wapo-addon-label' );

				option.find( '.yith-wapo-error' ).remove();
				label.removeClass( 'wapo-error' );
			}






		// ***** EVENTS ******

		// Calculate Add-ons price triggers
		$(document).on(
			'ywgc-amount-changed',
			function (e, button_amount) {
				let price = button_amount.data('price');
				let container = $(wapoDOM.addonsContainer);

				container.attr('data-product-price', price);
				calculateTotalAddonsPrice();
			}
		);

		/**
		 * Since 4.0.0 - Allow external plugins the possibility to recalculate totals, after having changed the price.
		 *
		 * Price param is necessary.
		 */
		$(document).on(
			'yith-wapo-product-price-updated',
			function (e, price) {
				if (typeof price !== 'undefined') {
					$(wapoDOM.addonsContainer).attr('data-product-price', price);
				}
				calculateTotalAddonsPrice();
			}
		);

		// YITH WC Gift Cards integration.
		$(document).on('change', '.gift-cards-list .ywgc-manual-amount-container input.ywgc-manual-amount', function (e) {
			let t = $(this),
				price = t.val();

			let container = $(wapoDOM.addonsContainer);

			container.attr('data-product-price', price);
			calculateTotalAddonsPrice();
		});

		// WC Product Bundles integration.
		$(document).on('woocommerce-product-bundle-updated-totals', function (e, bundle) {
			let bundlePrice = bundle.price_data.subtotals.price;
			let bundlePriceH = $(bundle.$bundle_price);
			let bundlePriceHtml = bundlePriceH.find('.amount').html();

			let container = $(wapoDOM.addonsContainer);

			container.attr('data-product-price', bundlePrice);
			calculateTotalAddonsPrice();

		});

		// YITH Dynamic integration.
		$(document).on(
			'ywdpd_price_html_updated',
			function (e, html_price) {
				let price = $(html_price).children('.amount bdi').text();
				price = wcPriceToFloat(price);

				if (!isNaN(price)) {
					let container = $(wapoDOM.addonsContainer);

					container.attr('data-product-price', price);
					calculateTotalAddonsPrice();
				}
			}
		);
		// YITH WC Product Bundles integration.
		$(document).on(
			'yith_wcpb_ajax_update_price_request',
			function (e, response) {

				let price = response.price;

				if (!isNaN(price)) {

					$(wapoDOM.addonsContainer).attr('data-product-price', price);

					$( document ).trigger( 'yith-wapo-reload-addons', price );
				}
			}
		);

		$(document).on(
			'change',
			'form.cart div.yith-wapo-addon, form.cart .quantity input[type=number]',
			function (e) {
				if ($(e.delegateTarget.activeElement).hasClass('yith-wapo-edit-product-cart')) {
					return false;
				}

				let addonOpt = $(e.target);
				maybeCalculateTotals(addonOpt)
			}
		);
		$(document).on(
			'keyup',
			'form.cart .yith-wapo-addon-type-number input[type="number"], form.cart .yith-wapo-addon-type-text input[type="text"], form.cart .yith-wapo-addon-type-textarea textarea',
			function (e) {
				if ($(e.delegateTarget.activeElement).hasClass('yith-wapo-edit-product-cart')) {
					return false;
				}

				let addonOpt = $(this);

				maybeCalculateTotals(addonOpt)
			}
		);
		$(document).on(
			'wapo-colorpicker-change wapo-colorpicker-clear',
			function (e, addonOpt) {
				if ($(e.delegateTarget.activeElement).hasClass('yith-wapo-edit-product-cart')) {
					return false;
				}
				maybeCalculateTotals($(addonOpt))
			}
		);

		/** Product quantity change */
		$( document ).on( 'change keyup', '.yith-wapo-option .wapo-product-qty', productQuantityChange );
		$( document ).on( 'reset_data', resetAddons );
		$( document ).on( 'found_variation', foundVariation );

		/** ajax reload addons **/
		$( document ).on( 'yith-wapo-reload-addons', reloadAddons );

		/** Uploads */
		$( document ).on( 'click', '.yith-wapo-uploaded-file .remove', removeUploadedFile );

		/** Checkboxes click */
		$( 'form.cart' ).on('click', 'span.checkboxbutton', function() {
			if ( $( this ).find( 'input' ).is( ':checked' ) ) {
				$( this ).addClass( 'checked' );
			} else {
				$( this ).removeClass( 'checked' );
			}
		});
		/** Checkboxes change */
		$( document ).on( 'change', '.yith-wapo-addon-type-checkbox input', checkboxOnChange );

		/** Labels onChange */
		$( document ).on('click', '.yith-wapo-addon-type-label .yith-wapo-option div.label', function() {
			$( this ).closest( '.yith-wapo-option' ).find( '.yith-proteo-standard-checkbox' ).click();
		} );
		$( document ).on( 'change', '.yith-wapo-addon-type-label input', labelsOnChange );

		/** Input text or textarea change */
		$(document).on('change keyup', '.yith-wapo-addon-type-text input', inputOnChange);
		$(document).on('change keyup', '.yith-wapo-addon-type-textarea textarea', textareaOnChange);

		/** Color click */
		$( document ).on('click', '.yith-wapo-addon-type-color .yith-wapo-option div.label', function() {
			$( this ).closest( '.yith-wapo-option' ).find( '.yith-proteo-standard-checkbox' ).click();
		} );
		$( document ).on('change', '.yith-wapo-addon-type-color input', colorOnChange );

		/** Product click */
		$( document ).on( 'click change', '.yith-wapo-addon-type-product .quantity input', function (e) {
				e.stopPropagation();
			}
		);
		$( document ).on('click', '.yith-wapo-addon-type-product .yith-wapo-option .product-container',
			function() {
				$( this ).closest( '.yith-wapo-option' ).find( '.yith-proteo-standard-checkbox' ).click();
			}
		);
		$( document ).on('change', '.yith-wapo-addon-type-product .yith-wapo-option input.yith-proteo-standard-checkbox', productOnChange );

		/** Add-on image click */
		$( document ).on( 'click', '.yith-wapo-option .image-container', addonImageClicked );

		/** Radio click */
		$('form.cart').on('click', 'span.radiobutton', function () {
			if ($(this).find('input').is(':checked')) {
				$(this).closest('.yith-wapo-addon.yith-wapo-addon-type-radio').find('span.radiobutton.checked').removeClass('checked');
				$(this).addClass('checked');
			}
		});
		/** Radio change */
		$( document ).on('click', '.yith-wapo-addon-type-radio input', radioOnChange);

		/** Select click */
		$( document ).on('change', '.yith-wapo-addon-type-select select', selectOnChange);

		/** Input file */
		$( document ).on('change', '.yith-wapo-addon-type-file input.file', fileOnChange);
		$( document ).on('click', '.yith-wapo-ajax-uploader .button, .yith-wapo-ajax-uploader .link', function() {
			$( this ).closest( '.yith-wapo-option').find( 'input.file' ).click();
		});
		/** Number change */
		$(document).on('change keyup', '.yith-wapo-addon-type-number input', numberOnChange);

		/** Datepicker change */
		$( document ).on('click', '#wapo-datepicker-save button', datepickerSaveButton);
		$( document ).on('change', '#wapo-datepicker-time-select', datepickertimeOnChange);

		/** Toggle feature */
		$( document ).on('click', '.yith-wapo-addon.wapo-toggle .addon-header', toggleElement);

		/** Product quantity on key up */
		$( document ).on( 'keyup', '.wapo-product-qty', productQtyOnKeyUp );

		// WooCommerce Measurement Price Calculator (compatibility)
		$( 'form.cart' ).on('change', '#price_calculator.wc-measurement-price-calculator-price-table', yithWcMeasurementPC_Compatibility );

		// YITH WooCommerce Composite. Recalculate add-ons with the composite price.
		$( document ).on( 'yith_wcp_price_updated', function( ev, finalPrice ){
			$( document ).trigger( 'yith-wapo-reload-addons', finalPrice );
		});

		/** Ajax upload file */
		// preventing page from redirecting.
		$('html').on('dragover, drop', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
		// drag enter
		$(document).on('dragenter', '.yith-wapo-ajax-uploader', function (e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).css('opacity', '0.5');
		});
		// drag over
		$(document).on('dragover', '.yith-wapo-ajax-uploader', function (e) {
			e.stopPropagation();
			e.preventDefault();
		});

		// drag leave
		$(document).on('dragleave', '.yith-wapo-ajax-uploader', function (e) {
				e.stopPropagation();
				e.preventDefault();
				if ($(e.target).hasClass('yith-wapo-ajax-uploader')) {
					$(this).css('opacity', '1');
				}
			}
		);

		$( 'body' ).on('drop', '.yith-wapo-ajax-uploader', ajaxUploaderOnDrop);

		/** Min max rules */
		$(document).on('change', '.yith-wapo-addon-type-checkbox, .yith-wapo-addon-type-color, .yith-wapo-addon-type-label, .yith-wapo-addon-type-product', function () {
			checkMinMax($(this));
		});

		// Check required fields before adding to cart (Required select and min/max values).
		$(document).on('click', 'form.cart button', function () {
			return checkAddonsRequirements();
		});


		/** YITH Composite */
		$( document ).on( 'yith_wcp_price_updated', compositePriceUpdated );

		/** YITH RAQ */
		$( document ).on('click', '.add-request-quote-button', requestAQuoteButton);


		/** Init JS */
		initJS();

	}
);