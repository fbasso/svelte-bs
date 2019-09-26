
const updateAttribute = (node, collapseId, isExpanded) => {
	console.log('updateAttribute', node, collapseId, isExpanded);
	node.setAttribute('aria-controls', collapseId);
	node.setAttribute('role', 'button');
	node.setAttribute('aria-expanded', !!isExpanded);

}


export const collapse = (node, {collapseId, isExpanded}) => {
	console.log('collapse init');
	updateAttribute(node, collapseId, isExpanded);
	return {
		update: ({collapseId, isExpanded}) => {
			console.log('update');
			updateAttribute(node, collapseId, isExpanded);
		}
	};
}
