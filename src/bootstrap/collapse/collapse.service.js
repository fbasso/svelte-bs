
const updateAttribute = (node, collapseId, isVisible) => {
	console.log('updateAttribute', node, collapseId, isVisible);
	node.setAttribute('aria-controls', collapseId);
	node.setAttribute('role', 'button');
	node.setAttribute('aria-expanded', isVisible);

}


export const collapse = (node, {collapseId, isVisible}) => {
	console.log('collapse init');
	updateAttribute(node, collapseId, isVisible);
	return {
		update: ({collapseId, isVisible}) => {
			console.log('update');
			updateAttribute(node, collapseId, isVisible);
		}
	};
}
