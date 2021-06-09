(function($) {

	$(document).ready(function() {

		var $action_limit_input = $('#lpal-action-limit');

		function getActionLimitIds() {
			var action_limit = $action_limit_input.val();
			// Get IDs of pages within the action limit
			$.getJSON('./action-limit-ids/?action_limit=' + action_limit, function(data) {
				var count = data.length;
				// Set selected count
				var $open_count = $('#lister_open_cnt');
				if(count) {
					$open_count.find('span').text(count);
					$open_count.show();
				} else {
					$open_count.hide();
				}
				// Remove existing highlights
				$('.lpal-selected').removeClass('lpal-selected');
				$.each(data, function(i, item) {
					// Highlight rows
					$('#ProcessListerTable').find('tr[data-pid="' + item + '"]').addClass('lpal-selected');
				});
			});
		}

		// Get item IDs when action limit changes
		$action_limit_input.change(getActionLimitIds);

		// Get item IDs when an AJAX event is completed
		$(document).ajaxComplete(function(event, xhr, settings) {
			// Return early if the AJAX event was to get action limit IDs
			if(settings.url.startsWith('./action-limit-ids/')) return;
			getActionLimitIds();
		});

	});

}(jQuery));
