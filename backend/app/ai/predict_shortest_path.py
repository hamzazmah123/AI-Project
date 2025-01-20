def a_star_algorithm_with_alternatives(routes, start, end):
    open_list = []
    closed_set = set()

    def create_node(location, parent, g_cost, h_cost, route):
        return {
            "location": location,
            "parent": parent,
            "g_cost": g_cost,
            "h_cost": h_cost,
            "f_cost": g_cost + h_cost,
            "route": route  # Store the exact route to distinguish alternatives
        }

    def heuristic(current, destination):
        for route in routes:
            if route["start"] == current and route["end"] == destination:
                return route["distance"]
        return 0  # Assume uniform cost search

    def get_neighbors(current):
        return [
            {
                "location": route["end"],
                "cost": route["distance"],
                "via": route.get("via", []),
                "route": route  # Keep a reference to the specific route
            }
            for route in routes if route["start"] == current
        ]

    def reconstruct_path(node):
        path = []
        via_list = []
        total_distance = 0

        while node:
            path.append(node["location"])
            if node["parent"]:
                via_list.extend(node["route"].get("via", []))
                total_distance += node["route"]["distance"]
            node = node["parent"]

        return path[::-1], list(set(via_list)), total_distance

    # Initialize with the starting point
    start_node = create_node(start, None, 0, heuristic(start, end), None)
    open_list.append(start_node)

    found_routes = []  # To store all possible routes
    while open_list:
        open_list.sort(key=lambda x: x["f_cost"])
        current_node = open_list.pop(0)

        # If we've reached the end, reconstruct the path
        if current_node["location"] == end:
            path, via_list, distance = reconstruct_path(current_node)
            found_routes.append({
                "path": path,
                "distance": distance,
                "via": via_list
            })
            continue

        closed_set.add(current_node["location"])

        neighbors = get_neighbors(current_node["location"])
        for neighbor in neighbors:
            if neighbor["location"] in closed_set:
                continue

            g_cost = current_node["g_cost"] + neighbor["cost"]
            h_cost = heuristic(neighbor["location"], end)
            neighbor_node = create_node(neighbor["location"], current_node, g_cost, h_cost, neighbor["route"])

            existing_node = next((n for n in open_list if n["location"] == neighbor["location"] and n["route"] == neighbor["route"]), None)
            if existing_node and g_cost >= existing_node["g_cost"]:
                continue

            open_list.append(neighbor_node)

    # Return all found routes sorted by distance
    if found_routes:
        found_routes.sort(key=lambda x: x["distance"])
    return found_routes if found_routes else [{"path": ["No Path Found"], "distance": 0, "via": []}]
