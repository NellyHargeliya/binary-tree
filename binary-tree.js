'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		var node = new Node(data, null, null);
		if (this.root == null) {
			return this.root = node;
		}
		var currentNode = this.root;
		var parentNode = null;
		while (currentNode) {
			parentNode = currentNode;

			if (data < currentNode.data) {
				currentNode = currentNode.left;

				if (currentNode == null) {
					return parentNode.left = node;
				}
			} else {
				currentNode = currentNode.right;
				if (currentNode == null) {
					parentNode.right = node;

				}
			}
		}
	}

	contains(data) {
		var found = false,
			current = this.root;

		while (!found && current) {
			if (data < current.data) {
				current = current.left;
			}
			else if (data > current.data) {
				current = current.right;
			}
			else { found = true; }
		}
		return found;
	}

	remove(data) {
		var contains = this.contains(data);
		var found = !contains || this.root == null || data == null;
		if (found) {
			return false;
		} else {
			if (this.size() == 1) {
				return (this.root = null);
			}
			var parentNode = function (node) {
				var parent = node;
				while (data != node.data) {
					if (data < node.data) { parent = node; node = node.left;
					}
					else {
						parent = node; node = node.right;
					}
				}
				return parent;
			}(this.root);

			var removed = data < parentNode.data ? parentNode.left : parentNode.right;

			// node has no children
			if ((removed.left == null) && (removed.right == null)) {
				if (data < parentNode.data) {parentNode.left = null;}
				else { parentNode.right = null;}
				return null;
			}

			// node has one child
			if ((removed.left != null) || (removed.right != null)) {

				// node has no right child
				if (removed.left != null) {
					if (data < parentNode.data) {parentNode.left = removed.left; }
					else { parentNode.right = removed.left;}
					return this.root;
				}else {
					// node has no left child
					parentNode.right = removed.right;
					if (data < parentNode.data) {
						parentNode.left = removed.right;
					}
					else {
						parentNode.right = removed.right;
					}
					return this.root;
				}
			}

			// node has two children
			if ((removed.left != null) && (removed.right != null)) {

				if (data < this.root.data) {
					var tempMin = this.getMin();
					if (tempMin.right != null) {
						tempMin = tempMin.right;
					}
					parentNode.left = tempMin;

				} else if (data > this.root) {
					var tempMax = this.getMax();
					if (tempMax.left != null) {
						tempMax = tempMax.left;
					}
					removed.data = tempMax.data;
				}
				return parentNode;
			}
		}
	}

	size() {
		var treeSize = 0;
		if (this.root == null) return 0;
		treeSize = this.inOrder(this.root);
		return treeSize;
	}

	isEmpty() {
		inOrder(node) {
			if (node == null) return 0;
			return this.inOrder(node.left) + this.inOrder(node.right) + 1;
		}

	}
	getMin(){
		var current = this.root;
		while (current.left != null) {
			current = current.left;
		}
		return current;
	}
	getMax(){
		var current = this.root;
		while (!(current.right == null)) {
			current = current.right;
	}
		return current.data;
	}

}
