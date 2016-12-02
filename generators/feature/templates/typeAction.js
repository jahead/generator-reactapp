const <%= upper %> = { 
<%for(var i=0; i< upperOperations.length; i++) {%>  <%= upperOperations[i] %> : "<%= `${upper}_${upperOperations[i]}` %>",
<% } %>
}

export default <%= upper %>;