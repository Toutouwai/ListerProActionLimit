(function($) {

	$(document).ready(function() {

		var $action_limit_input = $('#lpal-action-limit');

		function getActionLimitIds() {
			var action_limit = $action_limit_input.val();
			// Get IDs of pages within the action limit
			$.getJSON('./action-limit-ids/?action_limit=' + action_limit, function(data) {
				var count = data.length;
				// Set selected
				var $open_count = $('#lister_open_cnt');
				$open_count.find('span').html(count);
				$('#lister_open_cnt2').html(count + '&nbsp;');
				if(count) {
					$open_count.show();
					$('#wrap_actions_items').removeClass('InputfieldStateCollapsed');
					$('#actions_items_all').removeAttr('checked');
					$('#actions_items_open')
						.removeAttr('disabled')
						.attr('checked', 'checked')
						.val(data.join(','))
						.parent('label')
						.removeClass('ui-state-disabled');
				} else {
					$open_count.hide();
					$('#actions_items_all').attr('checked', 'checked');
					$('#actions_items_open')
						.removeAttr('checked')
						.attr('disabled', 'disabled')
						.val('')
						.parent('label')
						.addClass('ui-state-disabled');
				}
				// Remove existing highlights
				$('tr.open').removeClass('open');
				$.each(data, function(i, item) {
					// Highlight rows
					$('#ProcessListerTable').find('tr[data-pid="' + item + '"]').addClass('open');
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
