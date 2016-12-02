const <%= upper %> = {
  <% for(var i=0; i< upperOperations.length; i++) { %>
    <%= upperOperations[i] %> : {
      REQUEST: "<%= `${upper}_${upperOperations[i]}_REQUEST` %>",
      SUCCESS: "<%= `${upper}_${upperOperations[i]}_SUCCESS` %>",
      FAILURE: "<%= `${upper}_${upperOperations[i]}_FAILURE` %>",
    }<% if(i + 1 < upperOperations.length) {%><%=","%><%}%>
   <% } %>
}

export default <%= upper %>;
