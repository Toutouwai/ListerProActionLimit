(function($) {

	// Set Lister filters value
	function setFilters(event, a) {
		if(a === 'lpal') return; // Prevent recursion
		var $filters = $('#ProcessListerFilters');
		var limit = $('#lpal-action-limit').val();
		var selector = $filters.val();
		var selector_pieces = selector.split(', ');
		// Remove any existing actions_limit
		selector_pieces.forEach(function(item, index) {
			if(item.startsWith('actions_limit=')) {
				selector_pieces.splice(index, 1);
			}
		});
		// Add a new actions_limit if set
		if(limit) selector_pieces.push('actions_limit=' + limit);
		// Set the filters value and trigger change with extra parameter to prevent recursion
		selector = selector_pieces.join(', ');
		$filters.val(selector).trigger('change', ['lpal']);
	}

	$(document).ready(function() {

		var $action_limit = $('#lpal-action-limit');
		var $filters = $('#ProcessListerFilters');

		// Remove change event handler from filter input so it's possible to manually set it
		$filters.addClass('no-auto-change');
		$(document).off('change', '.InputfieldSelector :input:not(.select-field):not(.input-value-autocomplete)').on('change', '.InputfieldSelector :input:not(.select-field):not(.input-value-autocomplete):not(.no-auto-change)', function() {
			InputfieldSelector.changeAny($(this));
		});

		// Show action limit input on label click
		$('#lpal-action-limit-label.collapsed').click(function() {
			$(this).text('Action limit:').removeClass('collapsed');
			$action_limit.show();
		});

		// Call setFilters() when action limit changes or selector changes
		$action_limit.change(setFilters);
		$filters.change(setFilters);

	});

}(jQuery));
